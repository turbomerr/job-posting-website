import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"

import DashboardCard from "@/components/DashboardCard";


export default async function page() {

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const [applications, postedJobs] = await Promise.all([
    // Applications query
    prisma.application.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        job: {
          include: {
            postedBy: true,
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
    }),
    //job query
    prisma.job.findMany({
      where: { postedById: session.user.id },
      include: { _count: { select: { applications: true } } },
      orderBy: { postedAt: "desc" }
    })
  ])


  return ( <DashboardCard applications={applications} postedJobs={postedJobs}/> );}

