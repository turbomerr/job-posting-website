import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type { Prisma } from "@prisma/client";

type ApplicationWithJob = Prisma.ApplicationGetPayload<{
  include: { job: { include: { postedBy: true } } };
}>;

type PostedJobWithCount = Prisma.JobGetPayload<{
  include: { _count: { select: { applications: true } } };
}>;

type DashboardCardProps = {
  applications: ApplicationWithJob[];
  postedJobs: PostedJobWithCount[];
};



export default async function DashboardCard({
  applications,
  postedJobs,
}: DashboardCardProps) {


    function Dot() {
        return <span className="mx-2 text-muted-foreground">•</span>;
    }

    return (

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>


            <div className="grid gap-8 md:grid-cols-2 md:gap-6">

                <section>
                    <div className="flex justify-between items-center mb-6 ">
                        <h2 className="text-xl font-semibold ">Posted Jobs</h2>
                        <Button asChild variant="link" className="text-indigo-600">
                            <Link href="/jobs/post">Post New Job</Link>
                        </Button>
                    </div>
               

                    <Card className="shadow-sm ">
                        {postedJobs.length === 0 ? (
                            <CardContent >
                                <p className="text-muted-foreground text-center">
                                    You havent posted any jobs yet.
                                </p>
                            </CardContent>
                        ) : (
                            <CardContent>
                                <div className="divide-y divide-border">
                                    {postedJobs.map((job) => (
                                        <div key={job.id} className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle className="text-lg font-medium ">
                                                        {job.title}
                                                    </CardTitle>
                                                    <CardDescription className="mt-1">
                                                       <span >
                                                            {job.location && <span>{job.location}</span>}
                                                            {job.location && job.type && <Dot />}
                                                            {job.type && <span>{job.type}</span>}
                                                            {(job.location || job.type) && <Dot />}
                                                            <span>{formatDistanceToNow(new Date(job.postedAt))}</span>
                                                        </span>
                                                    </CardDescription>
                                                </div>


                                                <div className="flex items-center ">
                                                    <Badge variant="secondary" className="pointer-events-none ">
                                                        {job._count.applications}{" "}
                                                        {job._count.applications === 1 ? "application" : "applications"}
                                                    </Badge>
                                                    <Button asChild variant="link" className="text-indigo-600">
                                                        <Link href={`/jobs/${job.id}`}>View Job</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        )}
                    </Card>
                </section>

                {/* Your Applications */}
                <section>
                    <h2 className="text-xl font-semibold text-foreground mb-8 ">Your Applications</h2>


                    <Card className="shadow-sm">
                        {applications.length === 0 ? (
                            <CardContent className="p-6">
                                <p className=" text-center">
                                    You have no applications yet.
                                </p>
                            </CardContent>
                        ) : (
                            <CardContent>
                                <div className="divide-y divide-border">
                                    {applications.map((app) => (
                                        <div key={app.id} className="p-6 relative">
                                            <div className="absolute right-6 top-6">
                                                {String(app.status).toUpperCase() === "PENDING" && (
                                                    <Badge className="bg-yellow-100 text-yellow-800 ">PENDING</Badge>
                                                )}
                                                {String(app.status).toUpperCase() === "APPROVED" && (
                                                    <Badge className="bg-green-100 text-green-800">APPROVED</Badge>
                                                )}
                                                {String(app.status).toUpperCase() === "REJECTED" && (
                                                    <Badge variant="destructive">REJECTED</Badge>
                                                )}
                                            </div>


                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle className="text-lg font-medium leading-6">
                                                        {app.job.title}
                                                    </CardTitle>
                                                    <CardDescription className="mt-1">
                                                        <span className="text-muted-foreground">
                                                            {app.job.location && <span>{app.job.location}</span>}
                                                            {app.job.location && app.job.type && <Dot />}
                                                            {app.job.type && <span>{app.job.type}</span>}
                                                            {(app.job.location || app.job.type) && <Dot />}
                                                            <span>Applied </span>
                                                        </span>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        )}
                    </Card>
                </section>
            </div>


            <Separator className="my-10" />
        </div>

    );
}