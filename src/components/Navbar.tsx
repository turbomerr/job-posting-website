import Link from "next/link";
import {BriefcaseBusiness} from "lucide-react"
import DesktopNavbar from "./DesktopNavbar";
import { ModeToggle } from "./ModeToggle"
import MobileNavbar from "@/components/MobileNavbar"


function Navbar() {
  return (
    <nav className="sticky top-8 z-50 mx-4">
        <div className="mx-auto w-full max-w-[1200px] border-b-1 rounded-xl border-blue-500 bg-card flex h-16 items-center justify-evenly">
            <Link href="/" className="flex items-center ">
                 <BriefcaseBusiness className="h-5 w-5"/>
                 <span className="px-2">JobBew</span>
            </Link>
            <DesktopNavbar/>
            <div className="hidden md:flex items-center">
                <ModeToggle/>
            </div>
            <MobileNavbar/>
        </div>
    </nav>
  )
}

export default Navbar