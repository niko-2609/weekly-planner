import * as z from 'zod';


/**
 *  For login, we don't need to add a limit of minimum length
    since the users might have different lengths of password
 */
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})




export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Password is required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
})