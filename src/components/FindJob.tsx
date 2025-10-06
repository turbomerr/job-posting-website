"use client"

import { Input } from "@/components/ui/input"
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
import { Card } from "@/components/ui/card"
import { useState } from "react";

type Props = { initialQ: string; initialType: string; initialLocation: string };

function FindJob({ initialQ, initialType, initialLocation }: Props) {
  const [q, setQ] = useState(initialQ);
  const [jobType, setJobType] = useState(initialType);
  const [location, setLocation] = useState(initialLocation);

    
    return (

        <Card className="px-4">
            <h1 className="text-2xl font-bold">Find a Job</h1>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-6 mt-6">

                <Input placeholder="Search job.." name="q" value={q} onChange={(e) => setQ(e.target.value)}/>
                <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger className="w-full">

                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="volunteer">Volunteer</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <input type="hidden" name="type" value={jobType} />
                <Input placeholder="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
                <Button className="col-span-full" type="submit" variant="outline">Search</Button>
            </form>

        </Card>

    )
}

export default FindJob