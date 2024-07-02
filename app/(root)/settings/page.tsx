import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";
import Image from "next/image";
 
async function Settings() {
    const session = await auth();

    let userImage = session?.user?.image ? session?.user?.image : ""
    
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="p-4 justify-between flex-col flex gap-2 ">
        <h1 className="text-4xl font-bold">Rishabh</h1>
        <p className="text-lg font-semibold">Manage your personal preferences here.</p>
      </div>

      <div className="my-7 p-4">
        <h2 className="text-xl font-bold">Basics</h2>
        <hr className="border-1 border-gray-300 mt-3" />

        <div className="flex flex-col gap-4 my-6">
          <div className="w-full flex justify-between items-center sm:justify-between">
            <p className="text-md font-semibold">Photo</p>
            <div className="hidden rounded-full w-30 h-30 overflow-hidden sm:w-30 sm:h-30 mt-4 sm:mt-0 sm:block">
            <Image src={userImage} alt="404" width={40} height={40} className="object-cover"/>
            </div>
            <Button size={"sm"}>Edit</Button>
          </div>

          <hr className="hidden sm:block border-1 border-gray-300" />
          <div className="w-full flex justify-between items-center sm:justify-between my-4">
            <p className="text-md font-semibold">Name</p>
            <p className="hidden sm:block">Rishabh Sharma</p>
            <Button size={"sm"}>Edit</Button>
          </div>
          <hr className="hidden sm:block border-1 border-gray-300" />
          <div className="w-full flex justify-between items-center sm:justify-between my-4">
            <p className="text-md font-semibold">Email Address</p>
            <p className="hidden sm:block">rish.abh26@outlook.com</p>
            <Button size={"sm"}>Edit</Button>
          </div>
        </div>
      </div>
      <div className="my-7 p-4">
        <h2 className="text-xl font-bold">Preferences</h2>
        <hr className="border-1 border-gray-300 mt-3" />

        <div className="flex flex-col gap-4 my-6">
          <div className="w-full flex justify-between items-start sm:justify-between my-4">
            <p className="sm:flex-45 text-md font-semibold">Language</p>
            <p className="sm:flex-55">English</p>
          </div>

          <hr className="hidden sm:block border-1 border-gray-300" />
          <div className="w-full flex justify-between items-center sm:justify-between my-4">
            <p className="sm:flex-45 text-md font-semibold">Date format</p>
            <p className="sm:flex-55">02-07-2024</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings
