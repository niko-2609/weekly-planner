import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig, User } from "next-auth"
import bcrypt from "bcryptjs";


import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "./data/user"
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
 


// Notice this is only an object, not a full Auth.js instance
export default {
  /**
   * Adding Credentials provider for siging in with email/passwd
   */
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
    async authorize(credentials) {

      // Check the schema of the user input 
      const validatedFields = LoginSchema.safeParse(credentials)


      if (validatedFields.success) {
        const { email , password } = validatedFields.data;

        // Get user from database
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        // Compare the password
        const passwordsMatch = await bcrypt.compare(
          password,
          user.password
        )


        // is passwords are matched, return user
        if (passwordsMatch) return user;

      }
      // Break by default
      return null
    }
    
  })],
} satisfies NextAuthConfig