"use client"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "@/components/Spinner"
import Link from "next/link"



const ApplyButton = ({ jobId }: { jobId: string }) => {


    const { data: session, status } = useSession()
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [applicationStatus, setApplicationStatus] = useState<"idle" | "success" | "error">("idle")

    const handleApply = async () => {

        if (!session) {
            router.push("/auth/signin")
            return
        }


        setErrorMessage("")
        setApplicationStatus("idle")
        try {
            const res = await fetch(`/api/jobs/${jobId}/apply`, {
                method: "POST",
            })
            setApplicationStatus("success")
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("Failed apply for a job")
            }
            setApplicationStatus("error");
        }
    }

    if (status === "loading") {
        return (
            <div className="w-full">
                <Button className="w-full hover:border-indigo-500" disabled variant="outline"><Spinner /></Button>
            </div>)
    }

    if (applicationStatus === "success") {
        return (
        <div className="text-center">
            <p className="text-shadow-emerald-600">Application submitted successfully</p><br />
            <Link href={"/dashboard"}>View your application</Link>
        </div>)
    }


    return (
        <div className="w-full">
            <Button onClick={handleApply} className="w-full hover:border-indigo-500" variant="outline">Apply for this position</Button>
        </div>)


}

export default ApplyButton