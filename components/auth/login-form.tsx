"use client"
import * as z from 'zod'
import { LoginSchema } from '@/schemas';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form/form-error';
import { FormSuccess } from '@/components/form/form-success';
import { login } from '@/actions/login';
import { useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';


export const LoginForm = () => {

    const searchParams = useSearchParams();
    const [ isPending, startTransition ] = useTransition()
    const [ error, setError ] = useState<string | undefined>("");
    const [ success, setSuccess ] = useState<string | undefined>("")
 
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    useEffect(() => {

        let OAuthError = searchParams.get("error") === "OAuthAccountNotLinked" 
        ? "Email already in use with different provider" : ""
        if (OAuthError) {
            setError(OAuthError)
        }
        
    },[searchParams])

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")


       startTransition(() => {
        login(values).then((data) => {
            if(data.error) {
                setError(data.error)
            } 
            setSuccess(data.success)
        })
       })
    }

    return (
        <CardWrapper
            headerLabel="Welcome back!"
            backButtonLabel="Dont have an account? Register now"
            backButtonHref="/sign-up"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/** Contains the inputs */}
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='john.doe@example.com'
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='******'
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}   
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}