import React from 'react'
import { SignUp } from '@clerk/nextjs'

const Signup = () => {
    return (
        <div className='flex justify-center h-screen my-10'>
            <SignUp
                path="/signup"
                routing="path"
                signInUrl="/login"
                afterSignInUrl="/form/student-form"
            />
        </div>
    )
}

export default Signup