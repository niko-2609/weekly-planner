"use client"
import * as z from 'zod'
import { RegisterSchema } from '@/schemas';
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
import { register } from '@/actions/register';
import { useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';


export const RegisterForm = () => {

    const searchParams = useSearchParams();
    const [ isPending, startTransition ] = useTransition()
    const [ error, setError ] = useState<string | undefined>("");
    const [ success, setSuccess ] = useState<string | undefined>("")
 
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
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

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

       startTransition(() => {
        register(values).then((data) => {
            if(data.error) {
                setError(data.error)
            }
            setSuccess(data.success)
        })
       })
    }

    return (
        <CardWrapper
            headerLabel="Create a new accoutn"
            backButtonLabel="Already have an account? Login"
            backButtonHref="/sign-in"
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='John Doe'
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}