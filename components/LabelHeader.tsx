import React from 'react'

interface LabelHeaderInterface {
    labelText?: string;
    labelIcon?: React.ReactNode
}
export const LabelHeader: React.FC<LabelHeaderInterface> = ({labelText, labelIcon}) => {
  return (
    <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 flex'>
        <p className='p-0'>
            {labelIcon}
        </p>
        <p className='text-slate-700 text-base ml-2'>
             {labelText}
        </p>
    </div>
  )
}
