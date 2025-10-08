import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { SessionProvider } from "next-auth/react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { notFound } from "next/navigation";
import Link from "next/link"
import { MapPinned } from 'lucide-react';
import ApplyButton from "@/components/ApplyButton";

export default async function JobDetails({ params }: { params: Promise<{ id: string }> }) {
    const jobId = (await params).id;

    const detailJob = await prisma.job.findUnique({ where: { id: jobId }, include: { postedBy: true } });

    if (!detailJob) {
        notFound();
    }

    const result = formatDistanceToNow(new Date(detailJob?.postedAt))
    return (
        <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1">

                <Card className="px-4 py-4">
                    <Link className="text-sm text-indigo-500" href="/jobs"> -Back to Jobs</Link>
                    <CardHeader className="flex items-center justify-between">

                        <CardTitle className="text-2xl font-semibold">{detailJob?.title}</CardTitle>
                        <div className="flex gap-1 items-center">
                            <span className="font-bold">{detailJob?.location}</span>
                            <MapPinned className="w-4 h-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="font-serif text-lg"> {detailJob?.company} / {detailJob?.type}</p>
                    </CardContent>
                    <CardContent>
                        <p>Posted by {detailJob?.postedBy.name}</p>
                    </CardContent>

                    <CardContent className="flex justify-between items-center ">
                        <CardDescription >
                            <h1 className="underline font-bold">Job Description</h1>
                            {detailJob?.description}
                        </CardDescription>
                        <CardDescription className="">
                            <p>{result} ago</p>
                        </CardDescription>
                    </CardContent>

                    <CardFooter>
                        <SessionProvider>
                            <ApplyButton jobId={detailJob?.id} />
                        </SessionProvider>
                    </CardFooter>

                </Card>
            </div>
        </div>
    )
}