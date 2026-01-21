'use client';
import React from 'react'
import { Input } from './Input';

// Define the structure for each input field
interface InputConfig {
    label: string;
    value: string;
    type?: string; 
    key: string;   
}

interface CardWithInputInterface {
    // 1. Add cardId to the interface
    cardId: string; 
    headerText?: string;
    inputs: InputConfig[];
    onInputChange: (cardId: string, key: string, newValue: string) => void;
    isEditable?: boolean; 
    dynamicStyle?:  string
}

// 2. Destructure cardId from props
export const CardWithInput: React.FC<CardWithInputInterface> = ({ 
    cardId, 
    headerText, 
    inputs, 
    onInputChange,
    isEditable = true,
    dynamicStyle
}) => {
  return (
    <div className='border border-slate-200 rounded-xl p-6 bg-linear-to-br from-white to-slate-50 shadow-md'>
        <h3 className={`text-base font-semibold text-slate-800 mb-4 pb-3 border-b-2 ${dynamicStyle}`}>
            {headerText}
        </h3>
        <div className='space-y-4'>
            {inputs.map((input) => (
                <div key={input.key}>
                    <label className='...'>{input.label}</label>
                    <Input 
                        value={input.value}
                        isEditable={isEditable}
                        onChange={(val) => onInputChange(cardId, input.key, val)}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}
