"use client";
import Marketplace from "@/components/marketplace";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { NFT } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getNft() {
      try {
        const response = await axios.get("/api/marketplace");
        if (response.data.success) {
          setNfts(response.data.data);
        } else {
          setError(response.data.error);
        }
      } catch (err: any) {
        setError(err.response?.data?.error || "An error occurred.");
      }
    }
    getNft();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SignedIn>
        <Marketplace nfts={nfts} />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in" className={cn(buttonVariants())}>
          Sign in
        </Link>
      </SignedOut>
    </div>
  );
}