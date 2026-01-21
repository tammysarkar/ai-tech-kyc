import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

// Simplified stepper data moved inside or passed as props
interface Step {
    id: number;
    stepperNumber: number;
    stepperText?: string;
    actionDone?: boolean;
    actionProgress?: boolean
}

interface StepperInterface {
    activeStep: number;
    onStepClick: (step: number) => void;
    stepsData?: Step[]; 
}

export const Stepper: React.FC<StepperInterface> = ({ stepsData, activeStep, onStepClick }) => {
  return (
    <div className='bg-white rounded-xl shadow-md border border-slate-200 p-8 mb-6'>
        <div className='flex items-center justify-between'>
            {stepsData && stepsData.map((step, i) => {
                const isLastItem = i === stepsData.length - 1;
                
                // Dynamic logic based on activeStep state
                const isDone = step && step?.stepperNumber < activeStep;
                const isProgress = step.stepperNumber === activeStep;

                return (
                    <div className='flex items-center flex-1' key={step.id}>
                        <div className='flex flex-col items-center flex-1'>
                            <button 
                                onClick={() => onStepClick(step.stepperNumber)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 font-semibold shadow-lg shadow-blue-100
                                    ${isProgress || isDone ? 'text-white' : 'text-gray-500'} 
                                    ${isDone ? 'bg-[#00bd7d]' : isProgress ? 'bg-blue-600' : 'bg-gray-200'}`}
                            >
                                {isDone ? <Check size={20} /> : <span className='text-lg'>{step.stepperNumber}</span>}
                            </button>
                            <span className={`text-center mt-3 text-[12px] font-medium leading-tight min-h-10 flex items-center justify-center px-2
                                ${isProgress ? 'text-blue-600 font-bold' : 'text-slate-600'}`}>
                                {step.stepperText}
                            </span>
                        </div>
                        {!isLastItem && <ChevronRight className="text-gray-300 mx-2" />}
                    </div>
                );
            })}
        </div>
    </div>
  );
};
