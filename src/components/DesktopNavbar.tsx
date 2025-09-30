import Link from "next/link"
import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"
import { Search, CirclePlus, Settings, User } from "lucide-react"


function DesktopNavbar() {
    return (
        <div className="hidden md:flex items-center space-x-4">
           

            <Button variant="ghost" className="flex items-center gap-2" asChild>
                {/* buton gorunumunde ama link davranisinda */}
                <Link href="/jobs">
                    <Search className="h-5 w-5" />
                    <span className="hidden lg:inline">Browse Job</span>
                </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-x-2" asChild>
                <Link href="/jobs/post">
                    <CirclePlus className="w-5 h-5" />
                    <span className="hidden lg:inline">Post a Job</span>
                </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-x-2" asChild>
                <Link href="/dashboard">
                    <Settings className="w-5 h-5" />
                    <span className="hidden lg:inline">Dashboard</span>
                </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-x-2" asChild>
                <Link href="/auth/signin">
                    <User className="w-5 h-5" />
                    <span className="hidden lg:inline">Sign In</span>
                </Link>
            </Button>
        </div>
    )
}

export default DesktopNavbar