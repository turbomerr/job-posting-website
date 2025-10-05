import { prisma } from "@/lib/prisma"
import {
    Card,
    CardContent,
    CardDescription,
    CardAction,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { MapPin } from 'lucide-react'
import { Input } from "@/components/ui/input";
import { useState } from "react";

const page = async () => {

    //const [jobType, setJobType] = useState("")

    const jobs = await prisma.job.findMany({ orderBy: { postedAt: "desc" }, include: { postedBy: true }, });

    return (
        <div className="mx-auto max-w-5xl">

            <Card className="px-4">
                <h1 className="text-2xl font-bold">Find a Job</h1>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-6 mt-6">

                    <Input placeholder="Search jobb.." />
                    <select name="type" id="type" className="w-full h-10 rounded-md border border-input bg-black-500 px-3 text-sm
                        focus:outline-none focus:ring-2 focus:ring-ring
                        [appearance:none] pr-8 relative">
                        <option value="">All type</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="freelance">Freelance</option>
                        <option value="internship">Internship</option>
                        <option value="volunteer">Volunteer</option>
                    </select>
                    <Input placeholder="location" />
                    <Button className="col-span-full" type="submit" variant="outline">Search</Button>
                </form>
            </Card >

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
                        <CardFooter className="mt-auto flex items-center justify-between">
                            <div>
                                <Badge className="text-sm lg:text-md" variant="outline">Posted by {job.postedBy.name}</Badge>
                                <Badge className="text-sm lg:text-md" variant="outline">{job.type}</Badge>
                            </div>
                            <Link href={`jobs/${job.id}`} className="text-indigo-500 hover:text-indigo-800 font-medium">View Details </Link>
                        </CardFooter>



                    </Card>
                ))}


            </div>
        </div >
    )
}

export default page;

