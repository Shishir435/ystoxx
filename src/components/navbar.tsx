"use client"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "./ui/button"

const Navbar = () => {
  const pathname=usePathname()
  const navbarContent = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Market", href: "/" },
    { name: "Holdings", href: "/holdings" },
    { name: "News", href: "/news" }
  ]
  return (
    <div className="flex justify-between py-4">
        <div className="font-bold text-3xl">
          <Link href="/">
            <Image height={800} width={160} src="/ystoxx.svg" alt="ystoxx"  />
          </Link>
        </div>
        <div className="flex gap-8">
        {navbarContent.map((item, i) => {
          const activeClass = pathname === item.href ? "text-red-500  underline" : "";
          return (
            <div key={i}>
              <Link href={item.href} className={activeClass}>
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
        <div>
            <SignedIn>
                <UserButton afterSwitchSessionUrl="/sign-in" />
            </SignedIn>
            <SignedOut>
                <Link href="/sign-in" className={cn(buttonVariants())}>Sign In</Link>
            </SignedOut>
        </div>
    </div>
  )
}

export default Navbar