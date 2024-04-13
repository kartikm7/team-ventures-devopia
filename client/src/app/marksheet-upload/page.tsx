"use client";
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FileText } from 'lucide-react';
interface MarksheetUploadProps {
    // Add any props you might need here
}

const AnswerUpload: React.FC<MarksheetUploadProps> = () => {
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
                    <p>Upload your Marksheet Screenshot/PDF</p>
                </div>
                {selectedFile && (
                    <p>Selected file: {selectedFile.name}</p>
                )}
                <button className='px-4 py-2 text-white rounded-md bg-green-dark' disabled={!selectedFile}>Submit</button>
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
        </div>
    );
};

export default AnswerUpload;