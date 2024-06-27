"use server"

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db/db.utils";
import { getUserByEmail } from "@/data/user";

export const register =async (values: z.infer<typeof RegisterSchema>) => {

    // validate the values recieved using the LoginSchema
    const validatedFields = RegisterSchema.safeParse(values);

    // if validation fails, return error
    if(!validatedFields.success) {
        return { error: "Failed to Register, try again"}
    }

    const {email, password, name} = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email)
    

    if (existingUser) {
        return { error: "Email already in use"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    // TODO: Send verification token email

    // return success if validation passes
    return { success: "User registered!"}
}