import React from 'react'
interface HeaderComponentInterface {
    headerLabel ?: string;
    headerText ?: string;
    headerIcon ?: React.ReactNode;
    headerItemLabel ?: string;
    headerItemText ?: string;
    styles?: string;
}

export const Header: React.FC<HeaderComponentInterface> = ({headerLabel,headerText,headerIcon,headerItemLabel,headerItemText, styles}) => {
  return (
    <div className={`  bg-[#1348e7] w-full h-30 ${styles}`}>
        <div className='flex justify-between items-center h-full w-full px-4 2xl:px-16'>
            <div className='flex'>
                <div className='m-auto bg-white/20 backdrop-blur-sm rounded-xl p-3'>
                    {/* <Shield className='w-10 h-10 text-white'/> */}
                    {headerIcon}
                </div>
                <div className='text-white  p-5'>
                    <p className='text-xl font-bold'>
                       {headerLabel}
                    </p>
                    <p className='font-medium'>
                        {headerText}
                    </p>
                </div>
            </div>
            <div>
                <div className='bg-[#497bfa] p-2 rounded-md border border-amber-50 inline-block text-center text-white'>
                    <p className=''>{headerItemLabel}</p>
                    <p className='font-bold'>{headerItemText}</p>
                </div>
            </div>
        </div>

    </div>
  )
}
