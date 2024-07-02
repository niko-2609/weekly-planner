"use server"
import { signOut } from "@/auth"

export const signOutAction = async () => {
    console.log("INSIDE LOGOUT ACTION")
    await signOut();
}