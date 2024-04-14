"use client";
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FileText } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../../sdk/FirebaseSDK';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { set } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface AnswerUploadProps {
    // Add any props you might need here
}

const AnswerUpload: React.FC<AnswerUploadProps> = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<any>(null);
    const user = useUser();
    const router = useRouter();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (!selectedFile || !user.user?.id) return;
        setLoading(true);
        if (!user.user) return;
        try {
            const storageRef = ref(storage, `${user.user.id}/answers/${selectedFile.name}`);
            await uploadBytes(storageRef, selectedFile);
            const downloadURL = await getDownloadURL(storageRef);
            console.log("Download URL: ", downloadURL);
            const response = await axios.post('http://127.0.0.1:5000/score_student', {
                image_path: downloadURL,
            })
            setResponseData(response.data);
            setLoading(false);
            await setDoc(doc(db, 'users', user.user.id), {
                answer_url: [downloadURL],
                answer_predictions: response.data
            }, { merge: true });
            console.log("Response for answers: ", response.data);
            router.push('/correction');
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

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
                    <p>Upload your answer screenshots/pdfs</p>
                </div>
                {selectedFile && (
                    <p>Selected file: {selectedFile.name}</p>
                )}
                <div className='flex gap-10'>
                    <button className='px-4 py-2 text-white rounded-md bg-green-dark' disabled={!selectedFile} onClick={handleSubmit}>Submit</button>
                    <button className='px-4 py-2 text-white rounded-md bg-green-dark' disabled={!selectedFile} onClick={() => router.push("/marksheet-upload")}>Move to Marksheet Upload</button>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <p className='text-xl font-bold'>Steps to Follow</p>
                <ol className='text-lg list-decimal list-inside'>
                    <li>
                        <b>Take a Photo of the Answer Sheets</b>
                    </li>
                    <li>
                        <b>Convert the screenshot to PDF</b> <br />
                        <br />
                        <ul className='ml-10 list-disc'>
                            <li>
                                <b>Go to ilovepdf.com:</b> Click the upload area button to open a file selection window.
                            </li>
                            <li>
                                <b>Select Screenshot:</b> Click on the screenshot file to select it.
                            </li>
                            <li>
                                <b>Upload Confirmation:</b> Depending on the platform, you might see a confirmation dialog or progress bar indicating the upload is in progress. Download the Converted PDF
                            </li>
                            <br />
                        </ul>
                    </li>
                    <li>
                        <b>Upload the PDF here</b> <br />
                        <br />
                        <ul className='ml-10 list-disc'>
                            <li>
                                <b>Click Upload Area:</b> Click the upload area button to open a file selection window.
                            </li>
                            <li>
                                <b>Select Screenshot:</b> Click on the PDF file to select it.
                            </li>
                            <li>
                                <b>Upload Confirmation:</b> Depending on the platform, you might see a confirmation dialog or progress bar indicating the upload is in progress.
                            </li>
                            <br />
                        </ul>
                    </li>
                </ol>
            </div >
            {
                loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="w-32 h-32 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader"></div>
                    </div>
                )
            }
        </div >
    );
};

export default AnswerUpload;