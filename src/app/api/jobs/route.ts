import {auth} from "@/auth"
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"

export const POST = async(req: Request) => {
    
        const session = await auth(); // auth.ts
        if(!session?.user || !session?.user.id){ //if session.user not exist, redirect to /auth/signin
            return NextResponse.redirect(new URL("/auth/signin", req.url))
         }
        try {

            const data = await req.json()// from client application/json
            const job = await prisma.job.create({
                data : {
                    ...data,
                    postedById : session.user.id
                }
            })
            return NextResponse.json(job)
            
        } catch (error) {
            console.log("Error creating a job ",error)
            return new NextResponse("Internal server error", {status : 500})
        }
     
        
    
}

export const GET = async(req : Request) => {

    try {
        const jobs = await prisma.job.findMany({orderBy : {postedAt : "desc"}});
        return NextResponse.json(jobs)
    } catch (error) {
        console.log(error)
    }
}