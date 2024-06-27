import { auth } from "@/auth"
import Image from "next/image"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null

  const imageUrl = session?.user?.image || ""
 
  return (
    <div>
      <Image src={imageUrl} alt="my-image" width={200} height={200} />
    </div>
  )
}
