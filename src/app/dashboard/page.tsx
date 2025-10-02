"use client"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

function page() {
    
  return (
    <div>
        <h1>dashboard</h1>
        <Button variant="ghost" onClick={() => signOut()}>Logout</Button>
    </div>
  )
}

export default page