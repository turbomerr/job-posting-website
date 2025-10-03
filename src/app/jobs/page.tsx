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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { MapPin } from 'lucide-react'

const page = async () => {

    const jobs = await prisma.job.findMany({orderBy : {postedAt : "desc"}});

    return (
        <div className="mx-auto">
            <div className="w-full bg-gray-500">
                <h1>Find Jobs</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-8 mx-6 mt-6">
                {jobs.map((job, key) => (
                    <Card key={key} className="hover:border hover:border-blue-500 h-full ">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-2xl">{job.title}</CardTitle>
                                <CardDescription className="font-semibold text-lg">{job.salary}$</CardDescription>
                            </div>
                            <CardDescription className="font-bold text-lg">{job.company}</CardDescription>
                            <CardDescription className="flex gap-1">
                                <MapPin className="w-4 h-4"/>
                                {job.location}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="text-left">
                            <p>{job.description}</p>
                        </CardContent>
                        <CardFooter className="mt-auto flex items-center justify-between">
                                <Badge className="text-md" variant="outline">{job.type}</Badge>
                                <Button className="" variant="outline">Apply</Button>
                            
                        </CardFooter>


                    </Card>
                ))}


            </div>
        </div>
    )
}

export default page;

