"use server"

import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    authRoutes,
    apiAuthPrefix
} from "@/routes"
import { NextResponse } from "next/server"
import { debug } from "util"
 


const { auth } = NextAuth(authConfig)

// The actual middleware function that is invoked by a route
export default auth((req) => {

    // Debugging
    console.log("**********ENTERED MIDDLEWARE*********");


    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    console.log("*********FIRST LEVEL CROSSED************")

    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);


    console.log("********* SECOND LEVEL CROSSED**********")
    if (isApiAuthRoute) {
        console.log("******** IS API ROUTE***********")
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            console.log("********/settings redirect from level 3**********")
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return NextResponse.next();
    }

    if (!isPublicRoute && !isLoggedIn) {


        console.log("************redirect by level 4***************")
        return NextResponse.redirect(new URL("/sign-in", nextUrl))
    }


    console.log("***********Moving to default*************")
    return NextResponse.next();
})

// Regular expression to match all the routes that will invoke the middleware.
// Here all the routes will invoke the middleware
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}