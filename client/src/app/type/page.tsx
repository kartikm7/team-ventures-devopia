"use client";
import React from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { db } from '../../../sdk/FirebaseSDK';
import { useEffect } from 'react'
import { doc, setDoc } from 'firebase/firestore'

const TypeOfUser = () => {
    const router = useRouter();
    const user = useUser();
    const onClick = async (link: string) => {
        if (!user.user) return console.log('User not found');
        await setDoc(doc(db, "users", user.user.id), {
            role: link
        }, { merge: true });
        router.push("/form/" + link + "-form")
    }
    useEffect(() => {
        const addUser = async () => {
            if (user.user) {
                await setDoc(doc(db, "users", user.user.id), {
                    fullName: user.user.fullName,
                    email: user.user.primaryEmailAddress?.emailAddress,
                    uid: user.user.id,
                    marksheet: [],
                    profilePic: user.user.imageUrl,
                }, { merge: true });
            }
        }
        addUser()
    }, [user.user]);
    return (
        <div className='flex flex-col items-center w-full h-screen max-w-5xl gap-10 mx-auto mt-10'>
            <div className='w-full text-center'>
                <p className='text-3xl font-bold text-blue-heading'>What is your role in this society??</p><br />
                <p className='text-xl text-text-grey'>Add your role</p>
            </div>
            <div className='flex '>
                <div className='flex flex-col items-center justify-center w-64 h-48 gap-3 px-5 py-2 m-5 mt-10 text-white cursor-pointer rounded-2xl bg-green-dark hover:bg-green-heading' style={{
                    transition: 'all 0.2s ease'
                }}
                    onClick={() => onClick('student')}
                >
                    <User size={72} />
                    <span className='text-2xl'>Student</span>
                </div>
                <div className='flex flex-col items-center justify-center w-64 h-48 gap-3 px-5 py-2 m-5 mt-10 text-white cursor-pointer rounded-2xl bg-green-dark hover:bg-green-heading' style={{
                    transition: 'all 0.2s ease'
                }}
                    onClick={() => onClick('teacher-form')}
                >
                    <User size={72} />
                    <span className='text-2xl'>Teacher</span>
                </div>
            </div>
        </div>
    )
}

export default TypeOfUser