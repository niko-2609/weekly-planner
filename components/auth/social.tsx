"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"


export const Social = () => {

//  const onClick = async (provider: string) => {
    // startTransition(() => {
    //     signInWithOAuth(provider).then((data) => {
    //         if (data?.error) {
    //             console.log(data?.error)
    //             throw data.error
    //         }
    //         console.log("Sign in success");
    //         console.log(data?.success)

    //     })
    //     // login(values).then((data) => {
    //     //     if(data.error) {
    //     //         setError(data.error)
    //     //     }
    //     //     setSuccess(data.success)
    //     // })
    //    })
    //  }

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl : "/settings"
        })
    }

    return (
        <div className="flex gap-x-2 items-center w-full">
            <Button 
                size="lg"
                variant="outline" 
                className="w-full"   
                onClick={() => onClick("google")}
            >
                <FcGoogle />
            </Button>
            <Button 
                size="lg"
                variant="outline" 
                className="w-full"   
                onClick={() => onClick("github")}
            >
                <FaGithub />
            </Button>
        </div>
    )
}