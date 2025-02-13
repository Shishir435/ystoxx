"use client"
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
 
    return (<div>
      <SignedIn>
      hello
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in" className={cn(buttonVariants)}>Sign in</Link>
      </SignedOut>
    </div>)
}
