import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

const Navbar = () => {
  return (
    <div className="flex justify-between px-8 py-4">
        <div className="font-bold text-3xl">Ystoxx</div>
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