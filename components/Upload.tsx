import React, { useRef, ChangeEvent, useState } from 'react'
import { Upload, FileCheck } from 'lucide-react';

interface UploadDocProps {
    // Callback to send file data up to the parent
    onFileChange: (file: File | null, uploadTime: string | null) => void;
}

export const UploadDoc: React.FC<UploadDocProps> = ({onFileChange}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploadTime, setUploadTime] = useState<string | null>(null);
    
  const handleContainerClick = () => {
    // 2. Trigger the file browser when the div is clicked
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile)
      console.log('Selected file:', selectedFile.name);

      const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        setUploadTime(timeString);
        onFileChange(selectedFile, timeString);
      // Add your upload logic or state update here
    }
  };

       const handleRemove = () => {
        setFile(null);
        setUploadTime(null);
        // Notify parent that the file was removed
        onFileChange(null, null);
    };
  return (
    <div className='border-2 border-dashed border-slate-300 rounded-xl p-8 bg-slate-50 hover:border-blue-400 transition-colors w-full'>
        {!file ? 
            <div className='' onClick={handleContainerClick}>
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden" 
                />
                <div className='text-center'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
                        <Upload /> 
                    </div>
                    <span className='cursor-pointer'>
                            Click to upload
                    </span>
                    <span className='text-slate-600 text-base'>
                        or drag and drop
                    </span>
                    <p className='text-slate-500 mt-3 text-sm'>
                        PDF, DOC, DOCX up to 10MB
                    </p>
                </div>
            </div> : 
            <div>
                <div className='flex items-center justify-between bg-white border border-slate-200 rounded-lg p-4'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-emerald-100 rounded-lg p-3'>
                            <FileCheck />
                        </div>
                        <div>
                            <p className='text-slate-900 font-semibold text-lg'>
                                {file.name}
                            </p>
                            <p className='text-slate-600 text-sm mt-1'>
                                {`Uploaded at ${uploadTime}`  }
                            </p>
                            <div className='flex items-center gap-2 mt-2'>
                                <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700'>
                                    {"AI Confidence: 99%"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className='text-red-600 hover:text-red-700' onClick={() => handleRemove()}>
                        Remove
                    </button>
                </div>  
            </div>
        }
    </div>
  )
}
