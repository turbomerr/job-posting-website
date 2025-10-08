import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"
import { ok } from "assert";
import { error } from "console";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: Promise<{ jobId: string }> }) {

    const session = await auth();

    if (!session?.user || !session.user.id) {
        return NextResponse.redirect(new URL("/auth/signin", req.url))
    }

    try {
        const { jobId } = await params;
        const job = await prisma.job.findUnique({ where: { id: jobId } });

        if (!job) {
            return NextResponse.json({error :"Job not found"},{ status: 404 })
        }

        const existingApplication = await prisma.application.findFirst({ where: { jobId: jobId, userId: session.user.id } })

        if (existingApplication) {
            return  NextResponse.json({error : "You alredy applied for this job"}, {status : 409})
        }

        const application = await prisma.application.create({
            data: {
                jobId: jobId,
                userId: session.user.id,
                status : "PENDING"
            }
        })
        return NextResponse.json({application})

    } catch (error) {
        console.log("Error creating job: ",error);
        return new NextResponse("Internal server error", {status : 500})
    }

}