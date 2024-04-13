"use client"
import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

const Login = () => {
    const user = useUser();
    const router = useRouter();
    // useEffect(() => {
    //     if (user.user) {
    //         router.push('/form/student-form')
    //     }
    // }, [])
    return (
        <div className='flex items-center justify-center w-full my-10'>
            <SignIn
                path="/login"
                redirectUrl="/form/student-form"
                afterSignUpUrl="/form/student-form"
                afterSignInUrl="/form/student-form"
                signUpUrl='/signup'
            />
        </div>
    )
}

export default Login