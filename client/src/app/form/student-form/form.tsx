"use client"
import React from 'react'
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type FormValues = {
    fullName: string,
    grade: string,
    email: string,
    age: string,
    phone: string,
}

type FormItemProps = {
    label: string,
    namer: string,
    type: string,
    value: string,
    placeholder: string,
    defaultValue?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

type SelectItemProps = {
    label: string,
    defaultValue?: string,
    values: string[],
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const FormItem1 = (props: FormItemProps) => {
    return (
        <>
            <Input
                id={props.namer}
                name={props.namer}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                className='px-4 py-2 font-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-dark'
            />
        </>
    )
}

const SelectItem1 = (props: SelectItemProps) => {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue className='' placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className=''>
                <SelectGroup className=''>
                    <SelectLabel className=''>{props.label}</SelectLabel>
                    {
                        props.values.map((value, index) => (
                            <SelectItem key={index} value={value} onChange={props.onChange}>{value}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export function ProfileForm() {

    const [selected, setSelected] = useState<string>("");
    const user = useUser()
    const router = useRouter()

    const [form, setForm] = useState<FormValues>({
        fullName: "",
        grade: "",
        email: "",
        age: "",
        phone: ""
    })

    useEffect(() => {
        console.log(user)
        if (user.user) {
            setForm({
                fullName: user.user?.fullName || "",
                grade: "",
                email: user.user?.primaryEmailAddress?.emailAddress || "",
                age: "",
                phone: ""
            })
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form);
        router.push('/marksheet-upload');
    }

    return (
        <form className='flex flex-col gap-10'>
            <p className="w-full text-2xl font-bold text-center">Fill in the Details</p>
            <div className='flex flex-col gap-7'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Full Name: </label>
                    <FormItem1
                        label="Full Name"
                        namer="fullName"
                        type="text"
                        value={form.fullName}
                        placeholder='Enter your full name'
                        defaultValue={user.user ? user.user.fullName : ""}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Grade / Standard: </label>
                    <SelectItem1
                        label="Grade"
                        values={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
                        placeholder='Select your grade'
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Email: </label>
                    <FormItem1
                        label="Email"
                        namer="email"
                        type="email"
                        value={form.email}
                        placeholder='Enter your email'
                        defaultValue={user.user ? user.user.primaryEmailAddress?.emailAddress : ""}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Age: </label>
                    <FormItem1
                        label="Age"
                        namer="age"
                        type="number"
                        value={form.age}
                        placeholder='Enter your age'
                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Phone No. (+91)</label>
                    <FormItem1
                        label="Phone"
                        namer="phone"
                        type="tel"
                        value={form.phone}
                        placeholder='Enter your phone number'
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                </div>
            </div>
            <Button className="px-8 py-4 font-bold rounded-3xl bg-green-dark font-text" type="submit" onClick={handleSubmit}>Submit</Button>
        </form>
    )
}

export default ProfileForm
