"use server"

import * as z from "zod"

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login =async (values: z.infer<typeof LoginSchema>) => {

    // validate the values recieved using the LoginSchema
    const validatedFields = LoginSchema.safeParse(values);

    // if validation fails, return error
    if(!validatedFields.success) {
        return { error: "Login failed, try again"}
    }

    // check if user exsits based on userEmail
    const { email, password } = validatedFields.data
    // compare password entered with the stored hash value

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })

    } catch(error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error : "Invalid credentials"}
                default:
                    return { error: "Something went wrong"}
            }
        }


        // It is required to throw the error explicitly, otherwise it wont redirect to the DEFAULT_LOGIN_REDIRECT URL
        throw error;
    }


    // if yes, send jwt/cookie, something auth related item (need to search?)// back to client 

    // return success if validation passes
    return { success: "Login Successfull!"}
}
