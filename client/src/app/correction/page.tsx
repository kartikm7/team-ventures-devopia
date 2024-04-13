"use client";
import React from 'react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const sampleData = [
    {
        question: 'What is the capital of India?',
        answerByAI: 'New Delhi',
        answerByUser: 'New Delhi',
        score: "0.9"
    },
    {
        question: 'What is the capital of USA?',
        answerByAI: 'Washington DC',
        answerByUser: 'Washington',
        score: "0.8"
    },
    {
        question: 'What is the capital of UK?',
        answerByAI: 'London',
        answerByUser: 'London',
        score: "0.9"
    },
    {
        question: 'What is the capital of France?',
        answerByAI: 'Paris',
        answerByUser: 'Paris',
        score: "0.9"
    },
    {
        question: 'What is the capital of Australia?',
        answerByAI: 'Canberra',
        answerByUser: 'Canberra',
        score: "0.9"
    },
    {
        question: 'What is the capital of Japan?',
        answerByAI: 'Tokyo',
        answerByUser: 'Tokyo',
        score: "0.9"
    }
]

type BlockProps = {
    title: string;
    content: string | number; // Update to allow string or number content
    onChange?: (value: string) => void; // Add onChange prop for editable content
}

const BlockComponent = (props: BlockProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    return (
        <div className='flex flex-col gap-1 mx-4 my-1'>
            <p className='m-0 text-xl font-bold'>{props.title}</p>
            {props.onChange ? (
                <Input
                    value={props.content.toString()}
                    onChange={handleChange}
                    className='w-20 px-2 py-1 m-0 border border-gray-300 rounded'
                />
            ) : (
                <p className='m-0'>{props.content}</p>
            )}
        </div>
    )
}

const Corrections = () => {
    const user = useUser();
    const [count, setCount] = useState<number>(0);
    const [score, setScore] = useState<string>(sampleData[0].score);
    const [scoreHistory, setScoreHistory] = useState<string[]>([]);

    useEffect(() => {
        console.log('User:', user.user);
        console.log("Scores:", scoreHistory);
    }, [scoreHistory]);

    const handleAccept = () => {
        const newCount = count + 1;
        if (newCount < sampleData.length) {
            setCount(newCount);
            const newScore = sampleData[newCount].score;
            setScore(newScore);
            setScoreHistory([...scoreHistory, newScore]);
        }
    }

    const handleReject = () => {
        const newCount = count + 1;
        if (newCount < sampleData.length) {
            setCount(newCount);
            setScoreHistory([...scoreHistory, "0"]);
        }
    }

    const handleScoreChange = (newScore: string) => {
        setScore(newScore); // Convert string to number and update the score state
    }

    return (
        <div className='flex flex-col justify-center w-full max-w-6xl m-4'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-xl font-bold'>Final Result for {user.user && user.user.fullName}</h1>
                <BlockComponent title='Question: ' content={sampleData[count].question} />
                <BlockComponent title='Answer by AI: ' content={sampleData[count].answerByAI} />
                <BlockComponent title='Answer by User: ' content={sampleData[count].answerByUser} />
                <BlockComponent
                    title='Score: '
                    content={score}
                    onChange={handleScoreChange}
                />

                <div className='flex gap-5'>
                    <Button className='w-32 h-10 text-white bg-green-dark' onClick={handleAccept}>Accept</Button>
                    <Button className='w-32 h-10 text-white bg-red-500' onClick={handleReject}>Reject</Button>
                </div>

                {/* Display the score history */}
                <div className='mt-4'>
                    <h2 className='text-lg font-bold'>Score History:</h2>
                    <ul>
                        {scoreHistory.map((score, index) => (
                            <li key={index}>{score}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Corrections;