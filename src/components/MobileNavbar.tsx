"use client";

import { Menu } from 'lucide-react';
import { ModeToggle } from "./ModeToggle"
import Link from 'next/link';
import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { useState } from 'react';
import { Search, CirclePlus, Settings, User, BriefcaseBusiness } from "lucide-react"
import { useSession } from "next-auth/react"
import {signIn, signOut} from "next-auth/react"

function MobileNavbar() {

    const { data: session } = useSession();

    const [showMobilMenu, setShowMobilMenu] = useState(false);
    return (
        <div className="flex-md md:hidden items-center space-x-2">
            <ModeToggle />
            <Sheet open={showMobilMenu} onOpenChange={setShowMobilMenu}>
                <SheetTrigger>
                    <Menu className='w-5 h-5' />
                </SheetTrigger>

                <SheetContent side='right' className='w-[300px]'>
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className='flex flex-col space-y-4 mt-6 '>
                        <SheetClose asChild>
                            <Button variant="ghost" className='flex items-center text-md justify-start' asChild>
                                <Link href="/">
                                    <BriefcaseBusiness className="h-5 w-5" />
                                    <span className="px-2">Home</span>
                                </Link>
                            </Button>
                        </SheetClose>
                        {session ? (
                            <>
                                <SheetClose asChild>
                                    <Button variant="ghost" className='flex items-center text-md justify-start' asChild>
                                        <Link href="/jobs">
                                            <Search className="h-5 w-5" />
                                            Browse a Job
                                        </Link>
                                    </Button>
                                </SheetClose>

                                <SheetClose asChild>
                                    <Button variant="ghost" className='flex items-center text-md justify-start' asChild>
                                        <Link href="/jobs/post">
                                            <CirclePlus className="w-5 h-5" />
                                            Post a Job
                                        </Link>
                                    </Button>
                                </SheetClose>

                                <SheetClose asChild>
                                    <Button variant="ghost" className='flex items-center text-md justify-start' asChild>
                                        <Link href="/dashboard">
                                            <Settings className="w-5 h-5" />
                                            Dashboard
                                        </Link>
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button variant="ghost" className="flex items-center text-md justify-start" onClick={() => signOut()} asChild>
                                        <Link href="/">
                                            <User className="w-5 h-5" />
                                            Sign Out
                                        </Link>
                                    </Button>
                                </SheetClose>
                            </>) : (
                            <>
                                <SheetClose asChild>
                                    <Button variant="ghost" className='flex items-center text-md justify-start' onClick={() =>signIn()} asChild>
                                        <Link href="/auth/signin">
                                            <User className="w-5 h-5" />
                                            Sign In
                                        </Link>
                                    </Button>
                                </SheetClose>
                            </>)}
                    </nav>
                </SheetContent>
            </Sheet>
        </div >
    )
}

export default MobileNavbar