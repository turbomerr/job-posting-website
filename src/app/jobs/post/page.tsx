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
import { FormEvent } from "react"
import { title } from "node:process"

function page() {

    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            title : formData.get("title"),
            email : formData.get("email"),
            company : formData.get("company"),
            location : formData.get("location"),
            type : formData.get("type"),
            description : formData.get("description"),
            salary : formData.get("salary"),

        }
    }

    return (
        <div >

            <form className="mx-auto max-w-3xl space-y-6">
                <h1 className="text-2xl font-bold">Post a Job</h1>

                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" name="titel" placeholder="Title" required/>
                </div>

                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" placeholder="Email" required/>
                </div>


                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="company">Company</Label>
                    <Input type="text" name="company" placeholder="Company" required/>
                </div>

                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="location">Location</Label>
                    <Input type="text" name="location" placeholder="Location" required/>
                </div>

                <Select name="type" required>
                    <Label htmlFor="jobtype">Job Type</Label>
                    <SelectTrigger className="w-[180px]">

                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Jobs</SelectLabel>
                            <SelectItem value="it">IT</SelectItem>
                            <SelectItem value="webdev">Web Developer</SelectItem>
                            <SelectItem value="backend">Backend Developer</SelectItem>
                            <SelectItem value="frontend">Frontend Developer</SelectItem>
                            <SelectItem value="fullstack">Fullstack Developer</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="grid w-full gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" id="description" required/>
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="salary">Salary</Label>
                    <Input type="number" name="salary" placeholder="Salary" />

                </div>
                <Button variant="ghost" type="submit" className="w-full border border-blue-500">Post Job</Button>
            </form>
        </div>
    )
}

export default page