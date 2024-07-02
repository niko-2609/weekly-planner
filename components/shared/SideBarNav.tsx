"use client"

import React, { useEffect, useState } from 'react'
import { navLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { signOut } from '@/auth'
// import { SignOut } from '@/app/_components/sign-out'
import { getSession } from 'next-auth/react'
import { SignOut } from '@/app/_components/sign-out'
import { Session } from 'inspector'



const Sidebar = () => {

  // usePathname is a browser functionality (client side functionality).
  // thus to use this, need to add "use client" at the top of file
  const currentPath = usePathname();
  const [ session, setSession] = useState<any>(null);

  useEffect(() => {
    const getActiveSession = async () => {
      const fetchedSession = await getSession();
      setSession(fetchedSession)
    }

    getActiveSession()
  }, [])
  return (
    <aside className='hidden h-screen w-72 bg-white p-5 shadow-md shadow-purple-200/50 lg:flex'>
      <div className='flex flex-col gap-4 size-full'>
        <Link href="/" className="sidebar-logo">
          <Image src="/assets/app-logo.svg" alt="logo" width={180} height={28} />
        </Link>

        <nav className="h-full flex-col justify-between md:flex md:gap-4 py-7">
          <ul className="hidden w-full flex-col items-start gap-2 md:flex">
            {navLinks.slice(0, 4).map((link) => {
              const isActive = link.route === currentPath
              console.log("isACTIVE:", isActive)
              console.log("CURRENTPATH: ", currentPath);
              console.log("LINK ROUTE: ", link.route)

              return (
                <li key={link.route} className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-red-200 hover:shadow-inner group ${isActive ? 'bg-red-400 text-white' : 'text-gray-700'
                  }`}>
                  <Link className="p-16-semibold flex size-full gap-4 p-4" href={link.route}>
                    <Image
                      src={link.icon}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${isActive && 'brightness-200'}`}
                    />
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <ul className="hidden w-full flex-col items-start gap-2 md:flex">
            {navLinks.slice(4).map((link) => {
              const isActive = link.route === currentPath
              return (
                <li key={link.route} className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-red-300 hover:shadow-inner group ${isActive ? 'bg-red-400 text-white' : 'text-gray-700'
                  }`}>
                  <Link className="p-16-semibold flex size-full gap-4 p-4" href={link.route}>
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

            <li className="flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover transistion-all gap-4 py-2 transition-all hover:bg-red-300 hover:shadow-inner">
              <SignOut name={session?.user?.name} imageUrl={session?.user?.image} />
            </li>


          </ul>

        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
