import { prisma } from "@/lib/prisma"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import FindJob from "@/components/FindJob";
import { Badge } from "@/components/ui/badge"
import { MapPin } from 'lucide-react'



export default async function page({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; type?: string; location?: string }>
}) {
    const sp = await searchParams; // <-- önemli

    const q = typeof sp.q === "string" ? sp.q : "";
    const type = typeof sp.type === "string" ? sp.type : "";
    const location = typeof sp.location === "string" ? sp.location : "";
    const jobs = await prisma.job.findMany({
        where: {
            AND: [
                q ? {
                    OR: [
                        { title: { contains: q, mode: "insensitive" } },
                        { type: { contains: q, mode: "insensitive" } },
                        { location: { contains: q, mode: "insensitive" } },
                    ]
                } : {},
                type ? {type : type} : {},
                location ? {
                    OR : [
                        {title : {contains : location, mode : "insensitive"}},
                        {type : {contains : location, mode : "insensitive"}},
                        {location : {contains : location, mode : "insensitive"}},
                    ]
                } : {}

            ]
        }, orderBy: { postedAt: "desc" }, include: { postedBy: true },
    });

    return (
        <div className="mx-auto max-w-5xl">

            <FindJob
                initialQ={q}
                initialType={type}
                initialLocation={location}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-8  mt-6">
                {jobs.map((job, key) => (
                    <Card key={key} className="hover:border hover:border-blue-500 h-full ">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg lg:text-2xl">{job.title}</CardTitle>
                                <CardDescription className="font-semibold text-md lg:text-lg">{job.salary}$</CardDescription>
                            </div>
                            <CardDescription className="font-bold text-md lg:text-lg">{job.company}</CardDescription>
                            <CardDescription className="flex gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="text-left">
                            <p>{job.description}</p>
                        </CardContent>
                        <CardFooter className="mt-auto flex items-center justify-between ">
                            <div>
                                <Badge className="text-sm lg:text-md mx-0.5 my-0.5" variant="outline">Posted by {job.postedBy.name}</Badge>
                                <Badge className="text-sm lg:text-md mx-0.5 my-0.5" variant="outline">{job.type}</Badge>
                            </div>
                            <Link href={`jobs/${job.id}`} className="text-indigo-500 hover:text-indigo-800 font-medium text-sm md:text-md">View Details</Link>
                        </CardFooter>



                    </Card>
                ))}


            </div>
        </div >
    )
}



