"use client";
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FileText } from 'lucide-react';
import { db, storage } from '../../../sdk/FirebaseSDK';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { set } from 'react-hook-form';
interface MarksheetUploadProps {
    // Add any props you might need here
}

const AnswerUpload: React.FC<MarksheetUploadProps> = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState<any>(null);
    const [url, setUrl] = useState<string>('');
    const user = useUser();
    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        console.log(file);
    };
    const handleSubmit = async () => {
        setIsLoading(true);
        const fileRef = ref(storage, `users/${user.user?.id}/answer/${selectedFile?.name}`);
        if (!user.user) return;

        try {
            const snapshot = await uploadBytes(fileRef, selectedFile as Blob);
            console.log('Uploaded a blob or file!', snapshot);
            const downloadURL = await getDownloadURL(fileRef);
            setUrl(downloadURL);
            console.log('File available at', downloadURL);

            await setDoc(doc(db, 'users', user.user?.id), {
                marksheets: [downloadURL]
            }, { merge: true });

            const response = await axios.post('http://127.0.0.1:5000/marksheet', {
                image_url: downloadURL,
            });

            console.log(response.data);
            setResponseData(response.data);
            setIsLoading(false);

            await setDoc(doc(db, 'users', user.user?.id), {
                marksheets: [url],
                predictions: response.data // Use response.data directly here
            }, { merge: true });

            console.log("Response is: ", response.data);
            router.push('/dashboard/student');
        } catch (error) {
            console.error('Error sending POST request:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-row-reverse items-center justify-between max-w-6xl gap-10 mx-auto'>
            <div className='flex flex-col items-center justify-center gap-10 my-10'>
                <p className='text-2xl font-bold'>Upload Your Answer</p>
                <div className='relative flex flex-col items-center justify-center gap-10 border h-96 w-96 border-green-dark border-3 rounded-xl'>
                    {/* Position file input absolutely on top of the Upload icon */}
                    <Input type='file' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' onChange={handleFileChange} />
                    {
                        selectedFile ? (
                            <>
                                {
                                    selectedFile.type.includes('image') ? (
                                        <img src={URL.createObjectURL(selectedFile)} alt='Selected file' className='w-32 h-32 rounded-full' />
                                    ) : (
                                        <FileText className='w-32 h-32' />
                                    )
                                }
                                <p>{selectedFile.name}</p>
                            </>
                        ) : (
                            <div className='flex items-center justify-center w-32 h-32 rounded-full bg-green-light'>
                                <Upload className='w-32 h-32' />
                            </div>
                        )
                    }
                    <p>Upload your Marksheet Screenshot/PDF</p>
                </div>
                {selectedFile && (
                    <p>Selected file: {selectedFile.name}</p>
                )}
                <div className='flex gap-10'>
                    <button className='px-4 py-2 text-white rounded-md bg-green-dark cursor-pointer' disabled={!selectedFile} onClick={handleSubmit}>Submit</button>
                    <Link href='/answer-upload'><button className='px-4 py-2 text-white rounded-md bg-green-dark cursor-pointer' disabled={!selectedFile} >Move to Answer Upload</button></Link>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <p className='text-xl font-bold'>Steps to Follow</p>
                <ol className='flex flex-col gap-5 text-lg list-decimal list-inside'>
                    <li>
                        <b>Upload your answer sheets</b>
                        <ul className='ml-10 list-disc'>
                            <li>Click on "Upload" and select your marksheets file.</li>
                            <li>Supported formats: PDF , .JPG , .PNG</li>
                        </ul>
                    </li>
                    <li>
                        <b>Click on Submit</b>
                        <ul className='ml-10 list-disc'>
                            <li>Click on the "Submit" button to upload your marksheets</li>
                            <li>Please wait while we generate predictions.</li>
                        </ul>
                    </li>
                    <li>
                        <b>Wait for the results</b>
                        <ul className='ml-10 list-disc'>
                            <li>Once predictions are ready, they will be displayed on the screen.</li>
                            <li>You can download the results for future reference.</li>
                        </ul>
                    </li>
                    <li>
                        <b>Feedback</b>
                        <ul className='ml-10 list-disc'>
                            <li>For any issues or questions, contact support for assistance.</li>
                        </ul>
                    </li>
                </ol>
            </div>
            {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="w-32 h-32 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader"></div>
            </div>}
        </div>
    );
};

export default AnswerUpload;