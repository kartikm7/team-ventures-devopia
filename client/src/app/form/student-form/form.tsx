"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUser } from "@clerk/nextjs"
import { useMemo } from 'react';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    grade: z.string().min(2, {
        message: "Grade must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    age: z.number().int() // Ensure age is an integer
        .min(5, { message: "Please enter a valid age (minimum 5 year old)." }) // Minimum age of 1
        .max(20, { message: "Please enter a valid age (maximum 19 years old)." }), // Maximum age of 19
    school: z.string().min(2, {
        message: "School must be at least 2 characters.",
    }),
    phone: z.string().min(10, {
        message: "Phone number must be at least 10 characters.",
    })
});

export function ProfileForm() {
    let user = null;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    user = useUser().user;
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    useEffect(() => {
        if (user) {
            form.reset({
                fullName: user.fullName ?? "",
                grade: "",
                email: user.primaryEmailAddress?.emailAddress ?? "",
                age: 0,
                school: "",
            });
            console.log("Updated")
        }
    }, [user]);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <p className="font-text w-full text-center font-bold text-lg">Fill in the Details</p>
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md">Full Name</FormLabel>
                            <FormControl>
                                <Input className="py-3 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-1 focus-visible:border-green-dark mx-2 font-text rounded-3xl px-5 border-green-dark" placeholder="Enter your Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md">Grade</FormLabel>
                            <FormControl>
                                <Input className="py-3 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-1 focus-visible:border-green-dark mx-2 font-text rounded-3xl px-5 border-green-dark" placeholder="Enter your Grade" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md">Email</FormLabel>
                            <FormControl>
                                <Input className="py-3 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-1 focus-visible:border-green-dark mx-2 font-text rounded-3xl px-5 border-green-dark" placeholder="Enter your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md">Age</FormLabel>
                            <FormControl>
                                <Input className="py-3 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-1 focus-visible:border-green-dark mx-2 font-text rounded-3xl px-5 border-green-dark" placeholder="Enter your Age" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md">Phone Number</FormLabel>
                            <FormControl>
                                <Input className="py-3 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-1 focus-visible:border-green-dark mx-2 font-text rounded-3xl px-5 border-green-dark" placeholder="Enter your Age" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <Button className="px-8 py-4 rounded-3xl bg-green-dark font-text font-bold" type="submit">Submit</Button>
            </form>
        </Form >
    )
}

export default ProfileForm
