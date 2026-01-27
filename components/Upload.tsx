import React, { useRef, ChangeEvent } from 'react';
import { Upload, FileCheck, Loader2 } from 'lucide-react';

interface UploadDocProps {
    onUpload: (file: File | null, uploadTime: string | null) => void;
    isProcessing?: boolean;
    // New props to persist UI during step navigation
    initialFileName?: string | null;
    initialUploadTime?: string | null;
}

export const UploadDoc: React.FC<UploadDocProps> = ({ 
    onUpload, 
    isProcessing, 
    initialFileName, 
    initialUploadTime 
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // DERIVED STATE: Use props to determine if a file is "active" 
    // This keeps the UI visible when navigating back from Step 2
    const hasFile = !!initialFileName;
    
    const handleContainerClick = () => {
        if (isProcessing || hasFile) return; 
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            
            if (selectedFile.size > 30 * 1024 * 1024) {
                alert("File is too large. Max limit is 30MB.");
                return;
            }

            const now = new Date();
            const timeString = now.toLocaleTimeString('en-GB', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
            
            onUpload(selectedFile, timeString);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
        onUpload(null, null);
    };

    return (
        <div className={`border-2 border-dashed rounded-xl p-8 transition-colors w-full ${
            isProcessing ? 'bg-slate-100 border-slate-200' : 'border-slate-300 bg-slate-50 hover:border-blue-400'
        }`}>
            {!hasFile ? (
                <div className={`${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={handleContainerClick}>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden" 
                        disabled={isProcessing}
                    />
                    <div className='text-center'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
                            {isProcessing ? (
                                <Loader2 className="text-blue-600 animate-spin" />
                            ) : (
                                <Upload className="text-blue-600" />
                            )}
                        </div>
                        <div>
                            <span className='font-medium text-blue-600'>
                                {isProcessing ? 'Processing...' : 'Click to upload'}
                            </span>
                            {!isProcessing && <span className='text-slate-600'> or drag and drop</span>}
                        </div>
                        <p className='text-slate-500 mt-3 text-sm'>
                            PDF, DOC, DOCX up to 30MB
                        </p>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                    <div className='flex items-center justify-between bg-white border border-slate-200 rounded-lg p-4 shadow-sm'>
                        <div className='flex items-center gap-4'>
                            <div className={`rounded-lg p-3 ${isProcessing ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                {isProcessing ? <Loader2 className="animate-spin" size={24} /> : <FileCheck size={24} />}
                            </div>
                            <div>
                                <p className='text-slate-900 font-semibold text-lg truncate max-w-[200px] md:max-w-md'>
                                    {initialFileName}
                                </p>
                                <p className='text-slate-500 text-sm mt-0.5'>
                                    {isProcessing ? "AI is extracting data..." : `Extracted at ${initialUploadTime}`}
                                </p>
                                {!isProcessing && (
                                    <div className='flex items-center gap-2 mt-2'>
                                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100'>
                                            AI Confidence: 99%
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {!isProcessing && (
                            <button 
                                type="button"
                                className='px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer' 
                                onClick={handleRemove}
                            >
                                Remove
                            </button>
                        )}
                    </div>  
                </div>
            )}
        </div>
    );
};
