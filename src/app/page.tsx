import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();

   if (session?.user?.id) {
      redirect("/dashboard")
   }

  return (
    <main className="min-h-[calc(100vh-256px)] grid place-items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold">Please sign in to apply for jobs</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to your account to apply and track your applications.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
