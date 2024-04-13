"use client";
import React from 'react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const sampleData = [
    {
        question: 'What is the capital of India? Provide a detailed historical background, cultural significance, and notable landmarks.',
        answerByAI: `New Delhi, the capital of India, has a rich historical background dating back centuries. It was officially declared the capital of British India in 1911 and became the capital of independent India in 1947. The city's cultural significance is immense, with a diverse population representing various cultures, languages, and traditions from across the country.

        New Delhi is home to iconic landmarks such as the Red Fort, a UNESCO World Heritage Site that stands as a symbol of India's rich heritage. Other notable landmarks include India Gate, a memorial to Indian soldiers, and Qutub Minar, a towering minaret from the Mughal era. The city also boasts vibrant markets, museums, and art galleries that showcase India's artistic and cultural wealth.

        The capital city is not only a political and administrative center but also a hub of arts, literature, cuisine, and spirituality. Its blend of ancient traditions and modernity makes it a fascinating destination for tourists and a symbol of India's unity in diversity.`,
        answerByUser: `New Delhi, the capital of India, has a rich historical background dating back centuries. It was officially declared the capital of British India in 1911 and became the capital of independent India in 1947. The city's cultural significance is immense, with a diverse population representing various cultures, languages, and traditions from across the country.

        New Delhi is home to iconic landmarks such as the Red Fort, a UNESCO World Heritage Site that stands as a symbol of India's rich heritage. Other notable landmarks include India Gate, a memorial to Indian soldiers, and Qutub Minar, a towering minaret from the Mughal era. The city also boasts vibrant markets, museums, and art galleries that showcase India's artistic and cultural wealth.

        The capital city is not only a political and administrative center but also a hub of arts, literature, cuisine, and spirituality. Its blend of ancient traditions and modernity makes it a fascinating destination for tourists and a symbol of India's unity in diversity.`,
        score: "0.9"
    },
    {
        question: 'What is the capital of the United States? Describe its historical significance, political importance, and major landmarks.',
        answerByAI: `Washington DC, the capital of the United States, holds immense historical significance as the seat of the federal government. It was established in 1790 and named after George Washington, the first President of the United States. The city's layout and architecture reflect its role as a center of political power and democracy.

        Washington DC is home to iconic landmarks such as the White House, the official residence of the President, and the US Capitol, where Congress meets. The National Mall, with its memorials and monuments honoring key figures and events in American history, is a testament to the country's heritage and values.

        The city also houses renowned museums like the Smithsonian Institution, showcasing a vast collection of art, history, and culture. Beyond politics, Washington DC is a cultural hub with diverse neighborhoods, theaters, and culinary experiences that attract visitors from around the world.`,
        answerByUser: `Washington DC, the capital of the United States, holds immense historical significance as the seat of the federal government. It was established in 1790 and named after George Washington, the first President of the United States. The city's layout and architecture reflect its role as a center of political power and democracy.

        Washington DC is home to iconic landmarks such as the White House, the official residence of the President, and the US Capitol, where Congress meets. The National Mall, with its memorials and monuments honoring key figures and events in American history, is a testament to the country's heritage and values.

        The city also houses renowned museums like the Smithsonian Institution, showcasing a vast collection of art, history, and culture. Beyond politics, Washington DC is a cultural hub with diverse neighborhoods, theaters, and culinary experiences that attract visitors from around the world.`,
        score: "0.8"
    },
    {
        question: 'What is the capital of the United Kingdom? Provide a historical overview, cultural highlights, and notable landmarks.',
        answerByAI: `London, the capital of the United Kingdom, has a rich historical legacy dating back to Roman times. It has evolved into a global city known for its cultural diversity, historical landmarks, and vibrant arts scene. The city's iconic landmarks include the Tower of London, Buckingham Palace, and the Houses of Parliament.

        London's cultural highlights encompass world-class museums like the British Museum, Tate Modern, and National Gallery, showcasing art and artifacts from various eras and civilizations. The West End theatre district is renowned for its theatrical productions, while diverse neighborhoods offer cuisines from around the world.

        The city's history intertwines with significant events such as the Great Fire of London and the Blitz during World War II, shaping its resilient spirit and architectural landscape. London remains a hub of finance, education, and innovation, making it a dynamic metropolis with global influence.`,
        answerByUser: `London, the capital of the United Kingdom, has a rich historical legacy dating back to Roman times. It has evolved into a global city known for its cultural diversity, historical landmarks, and vibrant arts scene. The city's iconic landmarks include the Tower of London, Buckingham Palace, and the Houses of Parliament.

        London's cultural highlights encompass world-class museums like the British Museum, Tate Modern, and National Gallery, showcasing art and artifacts from various eras and civilizations. The West End theatre district is renowned for its theatrical productions, while diverse neighborhoods offer cuisines from around the world.

        The city's history intertwines with significant events such as the Great Fire of London and the Blitz during World War II, shaping its resilient spirit and architectural landscape. London remains a hub of finance, education, and innovation, making it a dynamic metropolis with global influence.`,
        score: "0.9"
    },
    {
        question: 'What is the capital of France? Describe its historical evolution, cultural significance, and famous landmarks.',
        answerByAI: `Paris, the capital of France, is renowned for its romantic ambiance, artistic heritage, and historical landmarks. It traces its origins to ancient Roman settlements and has played a pivotal role in European history and culture.

        The city's cultural significance is reflected in iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Paris is also known for its vibrant arts scene, with institutions like the Musée d'Orsay and Centre Pompidou showcasing world-class art collections.

        Parisian cuisine, fashion, and architecture contribute to its allure, attracting millions of visitors each year. The city's evolution from a medieval urban center to a modern metropolis embodies a blend of tradition and innovation, making it a symbol of French art, culture, and sophistication.`,
        answerByUser: `Paris, the capital of France, is renowned for its romantic ambiance, artistic heritage, and historical landmarks. It traces its origins to ancient Roman settlements and has played a pivotal role in European history and culture.

        The city's cultural significance is reflected in iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Paris is also known for its vibrant arts scene, with institutions like the Musée d'Orsay and Centre Pompidou showcasing world-class art collections.

        Parisian cuisine, fashion, and architecture contribute to its allure, attracting millions of visitors each year. The city's evolution from a medieval urban center to a modern metropolis embodies a blend of tradition and innovation, making it a symbol of French art, culture, and sophistication.`,
        score: "0.9"
    },
    {
        question: 'What is the capital of Australia? Provide insights into its founding, cultural diversity, and significant landmarks.',
        answerByAI: `Canberra, the capital of Australia, was established in the early 20th century as a purpose-built capital city. It represents the country's federal government and is known for its planned layout, green spaces, and national institutions.

        The city's cultural diversity is evident in its vibrant arts scene, multicultural festivals, and indigenous heritage sites. Key landmarks include the Australian War Memorial, Parliament House, and National Gallery of Australia, showcasing the nation's history, politics, and art.

        Canberra's role as the administrative center of Australia has shaped its identity as a hub of governance, education, and diplomacy. Its serene surroundings, including Lake Burley Griffin and surrounding bushland, contribute to a unique blend of urban and natural landscapes.`,
        answerByUser: `Canberra, the capital of Australia, was established in the early 20th century as a purpose-built capital city. It represents the country's federal government and is known for its planned layout, green spaces, and national institutions.

        The city's cultural diversity is evident in its vibrant arts scene, multicultural festivals, and indigenous heritage sites. Key landmarks include the Australian War Memorial, Parliament House, and National Gallery of Australia, showcasing the nation's history, politics, and art.

        Canberra's role as the administrative center of Australia has shaped its identity as a hub of governance, education, and diplomacy. Its serene surroundings, including Lake Burley Griffin and surrounding bushland, contribute to a unique blend of urban and natural landscapes.`,
        score: "0.9"
    },
    {
        question: 'What is the capital of Japan? Describe its historical significance, modern innovations, and major attractions.',
        answerByAI: `Tokyo, the capital of Japan, has a multifaceted identity blending ancient traditions with modern innovations. It emerged as the political and cultural center during the Edo period and has evolved into a global metropolis known for its technological advancements and cultural richness.

        The city's historical significance is evident in landmarks like the Imperial Palace, Senso-ji Temple, and Meiji Shrine, reflecting Japan's imperial legacy and spiritual heritage. Tokyo's modern skyline features iconic towers like Tokyo Tower and Tokyo Skytree, symbolizing its role as a hub of innovation and urban development.

        Tokyo's attractions range from traditional tea houses and sumo wrestling tournaments to high-tech districts like Akihabara and Shibuya. The city's dynamic blend of old and new offers visitors a glimpse into Japan's past, present, and future.`,
        answerByUser: `Tokyo, the capital of Japan, has a multifaceted identity blending ancient traditions with modern innovations. It emerged as the political and cultural center during the Edo period and has evolved into a global metropolis known for its technological advancements and cultural richness.

        The city's historical significance is evident in landmarks like the Imperial Palace, Senso-ji Temple, and Meiji Shrine, reflecting Japan's imperial legacy and spiritual heritage. Tokyo's modern skyline features iconic towers like Tokyo Tower and Tokyo Skytree, symbolizing its role as a hub of innovation and urban development.

        Tokyo's attractions range from traditional tea houses and sumo wrestling tournaments to high-tech districts like Akihabara and Shibuya. The city's dynamic blend of old and new offers visitors a glimpse into Japan's past, present, and future.`,
        score: "0.9"
    },
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