import React from 'react'
import { Check, ChevronRight } from 'lucide-react';

interface Step {
    id?: number;
    stepperNumber?: number;
    stepperText?: string;
    actionDone?: boolean;
    actionProgress?: boolean
}
interface StepperInterface {
    stepperDetails?: Step[]; 

}

export const Stepper: React.FC<StepperInterface> = ({stepperDetails}) => {
  return (
    <div className='bg-white rounded-xl shadow-md border border-slate-200 p-8 mb-6'>
        <div className='flex items-center justify-between'>
            {stepperDetails?.flatMap((value, i)=> {
                const isLastItem = i === stepperDetails.length - 1;
                return (
                    <div className='flex items-center flex-1' key={value.id}>
                        <div className='flex flex-col items-center flex-1'>
                            <button className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 font-semibold  ${value?.actionProgress || value?.actionDone ? 'text-white' : 'text-gray-500'} shadow-lg shadow-blue-200 ${value.actionDone ? 'bg-[#00bd7d]': value?.actionProgress ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                {!value?.actionDone ? <span className='text-lg'>
                                    {value?.stepperNumber}
                                </span> :  <Check />}
                            </button>
                            <span className={`text-center mt-3 text-sm font-medium leading-tight min-h-10 flex items-center justify-center ${!value.actionProgress ? 'text-slate-600' : 'text-blue-600'}`}>
                                {value?.stepperText}
                            </span>
                        </div>
                        {!isLastItem && <ChevronRight />}

                    </div>
                )
            })}
            
            
        </div>
    </div>
  )
}
