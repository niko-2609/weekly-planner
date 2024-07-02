import Image from "next/image"
import { signOutAction } from "@/actions/signOut"
 
export function SignOut({name, imageUrl}: {name: any, imageUrl: any}) {
  
  const logout = async () => {
    await signOutAction()
  }

  return (
   <button className="p-16-semibold flex size-full gap-3 py-2 items-center" onClick={logout}>
    <div className="ml-3 rounded-full overflow-hidden w-8 h-8">
      <Image src={imageUrl} alt="" width={40} height={40}  objectFit="cover"/>
    </div>
      <p className='text-lg'>{name}</p>
   </button>
  )
}