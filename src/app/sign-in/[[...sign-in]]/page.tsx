import { SignIn } from '@clerk/nextjs';

const Page = () => {
  // const {userId}=useAuth();
  // if(userId) redirect("/get-credit")
  return (
    <div><SignIn forceRedirectUrl="/get-credit" /></div>
  )
}

export default Page