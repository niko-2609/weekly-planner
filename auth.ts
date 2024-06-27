import NextAuth , { User, type DefaultSession} from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db/db.utils"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
 


 
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages :{
    signIn: "/sign-in",
    error: "/error"
  },
  events: {
    async linkAccount ({user}) {

      // once the user is signed in with OAuth provider,
      // this will update the emailVerified field for that user to the present/current date.
      await db.user.update({
        where :{ id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async session({ session, user, token}) {
      // Adding user id(sub) from token in session
      if (token.sub && session.user) {
           session.user.id = token.sub
      }

      // Adding user "role" from token to session
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({token}) {
      // check if the user id exists in token, if no, return the token
      if (!token.sub) return token;

      // find if user present in token, exists in db 
      const existingUser = await getUserById(token.sub)

      // if no user is present, do nothing and return the token
      if (!existingUser) return token;

      // fetch the role value from db and add it in the token
      token.role = existingUser.role


      // default return 
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})