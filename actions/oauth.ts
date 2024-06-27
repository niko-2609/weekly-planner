"use server"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const signInWithOAuth = async (provider: any) => {
    try {
        await signIn(provider,{
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });

        return { success: "Sign in success"}

    } catch(error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error : "Invalid credentials"}
                default:
                    return { error: "Something went wrong"}
            }
        }

        throw error
    }

}