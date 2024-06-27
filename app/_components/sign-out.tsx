import { signOut } from "@/auth"
import UserAvatar from "./userAvatar"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">
        <UserAvatar />
      </button>
    </form>
  )
}