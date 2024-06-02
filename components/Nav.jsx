"use client"

//components
import Link from "next/link"
import Image from "next/image"
//modules
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
//lib
import { paths } from "@/lib/constants"
//images
import LogoIcon from "/public/assets/images/logo.svg"

export default function Nav() {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [isToggledMenu, setIsToggledMenu] = useState(false)

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  const toggleMenu = () => {
    setIsToggledMenu((prev) => !prev)
    console.log("Toggle menu")
  }

  const hideMenu = () => {
    setIsToggledMenu(false)
    console.log("Hide menu")
  }

  const signOutUser = () => {
    hideMenu()
    signOut()
    console.log("Sign Out")
  }

  return (
    <nav className="w-full flex-between mb-16 pt-3">
      <Link href={paths.home} className="flex flex-center gap-2">
        <Image
          src={LogoIcon}
          alt="Promptify logo"
          width="50"
          height="50"
          className="object-contain"
          priority
        />
        <p className="logo_text">Promptify</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={paths.createPrompt} className="black_btn">
              Create prompt
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={paths.profile}>
              <Image
                src={session?.user.image}
                alt="profile"
                className="rounded-full"
                width={37}
                height={37}
                priority
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="profile"
              className="rounded-full cursor-pointer"
              width={37}
              height={37}
              priority
              onClick={toggleMenu}
            />
            {isToggledMenu && (
              <div className="dropdown">
                <Link
                  href={paths.profile}
                  className="dropdown_link"
                  onClick={hideMenu}
                >
                  My Profile
                </Link>
                <Link
                  href={paths.createPrompt}
                  className="dropdown_link"
                  onClick={hideMenu}
                >
                  Create Prompt
                </Link>
                <button type="button" onClick={signOutUser} className="black_btn mt-5 w-full">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}