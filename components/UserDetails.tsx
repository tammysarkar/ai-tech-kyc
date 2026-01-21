import React, { useEffect, useState } from 'react'
import { Header } from './Header';
import { Shield, ArrowLeft, FileText } from 'lucide-react';
import { MainInfo } from './MainInfo';
import { Stepper } from './Stepper';

interface UserDetailsInterface {
    userId: number;
    onBack: (id: number | null) => void;
}

const STEPS_DATA = [
    { id: 1, stepperNumber: 1, stepperText: "Baseline (Client Profile on file)" },
    { id: 2, stepperNumber: 2, stepperText: "CAF Requirements Assessment" },
    { id: 3, stepperNumber: 3, stepperText: "Connected Parties" },
    { id: 4, stepperNumber: 4, stepperText: "Screening Assessment" },
    { id: 5, stepperNumber: 5, stepperText: "Finalize Client Attestation Form (CAF)" },
    { id: 6, stepperNumber: 6, stepperText: "Submit Review" }
];


export const UserDetails: React.FC<UserDetailsInterface> = ({userId, onBack}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [stepsData, setStepsData] = useState(STEPS_DATA);

    const handleStepClick = (stepNumber: number) => {
        setCurrentStep(stepNumber);
    };

    const activeStepDetails = stepsData.find(s => s.stepperNumber === currentStep);

  return (
    <div className='w-full'>
        {userId && 
            <div className='user-details-container'>
                <div className='mb-8 flex cursor-pointer hover:text-[#1559f8]'>
                    <ArrowLeft fontSize={12} />
                    <button onClick={()=> onBack(null)} className='cursor-pointer '>
                        Back to Dashboard
                    </button>
                </div>
                <div className='header-user-details-container'>
                    <Header 
                        headerLabel={"Pacific Financial Services"}
                        headerText={"AI Enabled CAF preparation"}
                        headerIcon={<FileText className='w-10 h-10 text-white'/>}
                        headerItemLabel={"Current Step"}
                        headerItemText={`${currentStep}/6`}
                        styles='top-0'
                    />
                </div>
                <div className='stepper-conatiner'>
                    <Stepper 
                        activeStep={currentStep} 
                        onStepClick={handleStepClick}
                        stepsData={stepsData}
                    />
                </div>
                <MainInfo activeStepDetails={activeStepDetails}/>
                
            </div>
        }
    </div>
  )
}


