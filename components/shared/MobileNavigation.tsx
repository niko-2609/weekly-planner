'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
// import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
// import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/constants'



function MobileNav() {
    const currentPath = usePathname();
    return (
        <header className='flex justify-between items-center fixed h-16 w-full border-b-4 border-purple-100 bg-white px-5 py-3 lg:hidden'>
            <Link href="/" className=''>
                <Image
                    src='/assets/web-logo.svg'
                    alt="logo"
                    width={160}
                    height={28}
                />
            </Link>
            <nav className='flex gap-2'>
                {/* <SignedIn >
                    <UserButton afterSignOutUrl='/'></UserButton> */}

                    <Sheet>
                        <SheetTrigger>
                            {/* <Image
                                src="/assets/icons/menu.svg"
                                alt="menu"
                                width={32}
                                height={32}
                                className='cursor-pointer'
                            /> */}

                            <h2>Open Sheet</h2>
                        </SheetTrigger>
                        <SheetContent className='sheet-content sm:w-48'>
                            <>
                                {/* <Image
                                    src='/assets/images/logo-text.svg'
                                    alt="logo"
                                    width={152}
                                    height={23}
                                /> */}
                                <ul className="header-nav_elements">
                                    {navLinks.map((link) => {
                                        const isActive = link.route === currentPath

                                        return (
                                            <li key={link.route} className={`sidebar-nav_element group ${isActive && 'gradient-text} p-18 flex whitespace-nowrap text-dark-700'
                                                }`}>
                                                <Link className="sidebar-link" href={link.route}>
                                                    <Image
                                                        src={link.icon}
                                                        alt="logo"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>

                            </>
                        </SheetContent>
                    </Sheet>

                {/* </SignedIn> */}


                {/* <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                </SignedOut> */}
            </nav>
        </header>
    )
}

export default MobileNav
