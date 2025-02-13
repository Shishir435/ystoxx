"use client"
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const Page = () => {
    const {userId}= useAuth();
    const handleClick= async ()=>{
        const user= await axios.post("/api/user",{userId})
        console.log(user)
        
    }

  return (
    <div>Click  <Button onClick={handleClick}>here</Button> to get your credits</div>
  )
}

export default Page