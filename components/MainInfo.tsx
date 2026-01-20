import React from 'react'
import { LabelHeader } from './LabelHeader';
import { HardDriveUpload } from 'lucide-react';
import { UploadDoc } from './Upload';


interface MainInfoInterface {
    step? : number;
    stepText?: string;
    stepNumber? : number;
}
export const MainInfo: React.FC<MainInfoInterface> = ({step, stepText, stepNumber }) => {
  return (
    <div className='bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden'>
        <div className='bg-linear-to-r from-slate-50 to-blue-50 border-b border-slate-200 px-8 py-6 flex'>
            <div className='bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-lg'>
                Step {stepNumber}
            </div>
            <h2 className='text-2xl font-semibold text-slate-800'>
                {stepText}
            </h2>
        </div>
        <div className='p-8'>
            <div className='space-y-6'>
                <LabelHeader labelText='Upload the Client profile document for this client.' labelIcon={<HardDriveUpload size={20} />}/>
            </div>
            <div className='flex justify-between mt-8 pt-6 border-t border-slate-200'>
                <UploadDoc />
            </div>
        </div>
    </div>
  )
}
