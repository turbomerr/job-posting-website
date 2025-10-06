"use client"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { useRouter } from "next/router"

type Props = { jobId: string }

const ApplyButton = ({ jobId }: Props) => {

    const { data: session, status } = useSession()
    const router = useRouter();

    const handleApply = async() => {

        if(!session?.user){
            router.push("/auth/signin")
            return
        }
    }

    if (status === "loading") {
        return (
        <div className="w-full">
            <Button className="w-full hover:border-indigo-500" disabled variant="outline">Loading..</Button>
        </div>)
    }

    
    return (
        <div className="w-full">
            <Button onClick={handleApply} className="w-full hover:border-indigo-500" variant="outline">Apply for this position</Button>
        </div>)
    
  
}

export default ApplyButton