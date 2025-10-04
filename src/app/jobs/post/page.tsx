"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { LoadingButton } from "@/components/LoadingButton"



function page() {

    const [jobType, setJobType] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            company: formData.get("company"),
            location: formData.get("location"),
            type: formData.get("type"),
            description: formData.get("description"),
            salary: formData.get("salary"),

        }
        setLoading(true)
        try {

            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            window.location.href = "/"
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (


        <form className="mx-auto max-w-3xl space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold">Post a Job</h1>

            <div className="grid w-full items-center gap-3">
                <Label htmlFor="title">Title</Label>
                <Input type="text" name="title" placeholder="Title" required />
            </div>


            <div className="grid w-full items-center gap-3">
                <Label htmlFor="company">Company</Label>
                <Input type="text" name="company" placeholder="Company" required />
            </div>

            <div className="grid w-full items-center gap-3">
                <Label htmlFor="location">Location</Label>
                <Input type="text" name="location" placeholder="Location" required />
            </div>

            <div className="grid w-full items-center gap-3">
                <Select name="type" value={jobType} onValueChange={setJobType}>
                    <Label>Job Type</Label>
                    <SelectTrigger className="w-[180px]">

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
            </div>

            <div className="grid w-full gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" id="description" required />
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="salary">Salary</Label>
                <Input type="number" name="salary" placeholder="Salary" />

            </div>
            {loading ? <LoadingButton /> :
                <Button variant="ghost" type="submit" className="w-full border border-blue-500">
                    Post a Job
                </Button>}
        </form>

    )
}

export default page