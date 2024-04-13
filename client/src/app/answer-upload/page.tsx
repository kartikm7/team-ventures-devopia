"use client";
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FileText } from 'lucide-react';
interface AnswerUploadProps {
    // Add any props you might need here
}

const AnswerUpload: React.FC<AnswerUploadProps> = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
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
                    <p>Upload your answer screenshots/pdfs</p>
                </div>
                {selectedFile && (
                    <p>Selected file: {selectedFile.name}</p>
                )}
                <button className='px-4 py-2 text-white rounded-md bg-green-dark' disabled={!selectedFile}>Submit</button>
            </div>
            <div className='flex flex-col gap-3'>
                <p className='text-xl font-bold'>Steps to Follow</p>
                <ol className='text-lg list-decimal list-inside'>
                    <li>
                        <b>Take a screenshot of your answer sheet</b>
                        <br />
                        <br />
                        <ul className='text-lg list-disc list-inside'>
                            <li>
                                <b>Identify Screenshot Method:</b> There are several ways to take a screenshot depending on your operating system and device. Here are some common options:
                                <br />
                                <br />
                                <ul className='ml-10 list-disc'>
                                    <li>
                                        <b>PC:</b> Press Print Screen key (captures entire screen). Press Alt + Prt Sc (captures active window). Use the Snipping Tool app for a more precise selection.
                                    </li>
                                    <li>
                                        <b>Phone:</b> Press the side button and volume up button together.
                                    </li>
                                </ul>
                            </li>
                            <br />
                        </ul>
                    </li>
                    <li>
                        <b>Upload the screenshot here</b> <br />
                        <br />
                        <ul className='ml-10 list-disc'>
                            <li>
                                <b>Click Upload Area:</b> Click the upload area button to open a file selection window.
                            </li>
                            <li>
                                <b>Select Screenshot:</b> Click on the screenshot file to select it.
                            </li>
                            <li>
                                <b>Upload Confirmation:</b> Depending on the platform, you might see a confirmation dialog or progress bar indicating the upload is in progress.
                            </li>
                            <br />
                        </ul>
                    </li>
                </ol>
            </div >
        </div >
    );
};

export default AnswerUpload;