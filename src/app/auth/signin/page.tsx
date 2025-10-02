"use client"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react";
import Link from "next/link";

import { signIn } from "next-auth/react"


function SignInPage() {

    return (

        <div className="flex justify-center items-center min-h-[calc(100vh-20rem)]"> 
            <Card className="w-full max-w-md border bg-card backdrop-blur">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome the JobBew</CardTitle>
                <CardDescription>Sign in to post jobs or apply for opportunites</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button
                    onClick={() => signIn("github", {callbackUrl : "/dashboard"})}
                    variant="outline"
                    size="lg"
                    className="w-full justify-center gap-2"
                    >
                    <Github className="h-5 w-5" />
                    Continue with GitHub
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                    By signing in, you agree to our{" "}
                    <Link href="/terms" className="underline underline-offset-4">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="underline underline-offset-4">Privacy Policy</Link>.
                </p>

            </CardContent>

        </Card>
        </div>

    )
}

export default SignInPage