import React from 'react'
import { Header } from './Header';
import { Shield, ArrowLeft, FileText } from 'lucide-react';
import { MainInfo } from './MainInfo';
import { Stepper } from './Stepper';

interface UserDetailsInterface {
    userId: number;
    onBack: (id: number | null) => void;
}

const MAKER_STEPS =[
    'Baseline (Client Profile on file)',
    'CAF Requirements Assessment',
    'Connected Parties',
    'Screening Assessment',
    'Finalize Client Attestation Form (CAF)',
     'Submit Review'
];

const stepper = [
    {
        id: 1,
        stepperNumber: 1,
        stepperText: "Baseline (Client Profile on file)",
        actionDone: true,
        actionProgress: false
    },
    {
        id: 2,
        stepperNumber: 2,
        stepperText: "CAF Requirements Assessment",
        actionDone: false,
        actionProgress: true
    },
    {
        id: 3,
        stepperNumber: 3,
        stepperText: "Connected Parties",
        actionDone: false,
        actionProgress: false
    },
    {
        id: 4,
        stepperNumber: 4,
        stepperText: "Screening Assessment",
        actionDone: false,
        actionProgress: false
    },
    {
        id: 5,
        stepperNumber: 5,
        stepperText: "Finalize Client Attestation Form (CAF)",
        actionDone: false,
        actionProgress: false
    },
    {
        id: 6,
        stepperNumber: 6,
        stepperText: "Submit Review",
        actionDone: false,
        actionProgress: false
    }
]


export const UserDetails: React.FC<UserDetailsInterface> = ({userId, onBack}) => {
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
                        headerItemText={"1/6"}
                        styles='top-0'
                    />
                </div>
                <div className='stepper-conatiner'>
                    <Stepper stepperDetails={stepper}/>
                </div>
                <MainInfo />
                
            </div>
        }
    </div>
  )
}


