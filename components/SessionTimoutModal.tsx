import { Clock } from 'lucide-react';
import React, { FC } from 'react';

interface SessionTimoutModalProps {
    // Functions must be typed as () => void
    setShowIdleModal: (show: boolean) => void; 
    resetTimers: () => void;
    handleHardReset: () => Promise<void> | void;
    userId: number;
}

export const SessionTimoutModal: FC<SessionTimoutModalProps> = ({
    setShowIdleModal,
    resetTimers,
    handleHardReset,
    userId // Ensure userId is destructured here
}) => {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
                <div className="text-center">
                    <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900">Session Paused</h3>
                    <p className="text-slate-500 mt-2 text-sm text-center">
                        Progress for User ID <strong>{userId}</strong> has been saved.
                    </p>
                </div>
                
                <div className="flex flex-col gap-3 mt-8">
                    <button 
                        onClick={() => { 
                            setShowIdleModal(false); 
                            resetTimers(); 
                        }} 
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all cursor-pointer shadow-md"
                    >
                        Resume Work
                    </button>
                    
                    <button 
                        onClick={handleHardReset} 
                        className="w-full py-3 text-slate-600 hover:bg-slate-50 hover:text-red-600 rounded-xl transition-all text-sm cursor-pointer"
                    >
                        Clear Data & Exit
                    </button>
                </div>
            </div>
        </div>
    );
};
