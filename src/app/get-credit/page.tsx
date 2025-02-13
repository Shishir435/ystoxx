"use client"
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const [resp,setResp]=useState("")
    const {userId}= useAuth();
    if(!userId) redirect("/sign-in")
    const handleClick= async ()=>{
        const user= await axios.post("/api/user",{userId})
        setResp(JSON.stringify(user))
        console.log(user)
    }

  return (
    <div>
      Click  <Button onClick={handleClick}>here</Button> to get your credits
    {resp}
    </div>
  )
}

export default Page