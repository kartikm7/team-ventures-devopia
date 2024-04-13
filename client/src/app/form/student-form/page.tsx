"use client";

import React from 'react'
import { ProfileForm } from './form'
import Image from 'next/image'

const StudentForm = () => {
    return (
        <div className='flex items-center justify-between max-w-4xl gap-10 mx-auto my-10'>
            <div className='flex-1'>
                <img src="/images/student.jpg" alt="" />
            </div>
            <div className='flex-1'>
                <ProfileForm />
            </div>
        </div>
    )
}

export default StudentForm