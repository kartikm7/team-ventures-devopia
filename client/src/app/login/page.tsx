"use client"
import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

const Login = () => {
    return (
        <div className='flex justify-center w-full h-screen my-10'>
            <SignIn
                path="/login"
                redirectUrl="/type"
                afterSignUpUrl="/type"
                afterSignInUrl="/type"
                signUpUrl='/signup'
            />
        </div>
    )
}

export default Login