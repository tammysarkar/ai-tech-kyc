'use client';
import React from 'react';

interface InputInterface {
    isEditable?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input: React.FC<InputInterface> = ({ isEditable, value, onChange }) => {
  return (
    <input 
      type="text" 
      // 1. MUST be camelCase 'readOnly'
      // 2. Logic: if isEditable is TRUE, readOnly must be FALSE
      readOnly={!isEditable} 
      className={`w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800 font-medium 
        ${!isEditable ? 'bg-slate-50 cursor-not-allowed text-slate-500' : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`} 
      value={value || ''} // Ensure it's never undefined
      onChange={(e) => onChange?.(e.target.value)} 
    />
  );
};
