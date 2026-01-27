import React, { useEffect, useState } from 'react';
import { openDB } from 'idb'; 
import { Header } from './Header';
import { ArrowLeft, FileText } from 'lucide-react';
import { MainInfo } from './MainInfo';
import { Stepper } from './Stepper';
import { DB_CONFIG, STEPS_DATA } from './constants'; 

interface UserDetailsInterface {
    userId: number;
    onBack: (id: number | null) => void;
}

export const UserDetails: React.FC<UserDetailsInterface> = ({ userId, onBack }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [stepsData] = useState(STEPS_DATA);

    // --- 1. SESSION REHYDRATION (On Mount) ---
    useEffect(() => {
        const restoreSessionStep = async () => {
            if (!userId) return;
            try {
                const db = await openDB(DB_CONFIG.NAME, DB_CONFIG.VERSION);
                const saved = await db.get(DB_CONFIG.STORES.SESSION_META, userId);
                
                // If a recent session (30m) exists, jump to the saved step
                if (saved && (Date.now() - saved.timestamp < 30 * 60000)) {
                    setCurrentStep(saved.step); 
                }
            } catch (error) {
                console.warn("Restore failed:", error);
            }
        };
        restoreSessionStep();
    }, [userId]);

    // --- 2. UPDATE STEP & PERSIST TO DB ---
    // This is the critical update: we update the step in IDB 
    // as soon as the user clicks the stepper.
    const handleStepClick = async (stepNumber: number) => {
        setCurrentStep(stepNumber);

        // Update the 'step' field in IndexedDB so resume works for Step 2/3
        try {
            const db = await openDB(DB_CONFIG.NAME, DB_CONFIG.VERSION);
            const existingData = await db.get(DB_CONFIG.STORES.SESSION_META, userId);
            
            if (existingData) {
                await db.put(DB_CONFIG.STORES.SESSION_META, {
                    ...existingData,
                    step: stepNumber,
                    timestamp: Date.now()
                }, userId);
            }
        } catch (error) {
            console.error("Failed to update step persistence:", error);
        }
    };

    const activeStepDetails = stepsData.find(s => s.stepperNumber === currentStep);

    return (
        <div className='w-full'>
            {userId && 
                <div className='user-details-container'>
                    <div className='mb-8 flex items-center gap-2 cursor-pointer hover:text-[#1559f8] transition-colors'>
                        <ArrowLeft size={16} />
                        <button onClick={() => onBack(null)} className='cursor-pointer font-medium'>
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

                    <div className='stepper-conatiner mt-8'>
                        <Stepper 
                            activeStep={currentStep} 
                            onStepClick={handleStepClick} // Triggering the persist logic
                            stepsData={stepsData}
                        />
                    </div>

                    <MainInfo 
                        activeStepDetails={activeStepDetails} 
                        userId={userId}
                    />
                </div>
            }
        </div>
    );
};
