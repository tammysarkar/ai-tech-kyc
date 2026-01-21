import React from 'react'
import { CardWithInput } from '../CardWithInput'

export interface InputConfig {
    label: string;
    value: string;
    key: string;
    isEditable?: boolean;
    type?: string;
}

// Define the shape of a single entity (Section A or B)
export interface EntityData {
    clientName: string;
    entityType: string;
}

// Define the shape of the entire state object
export interface AllCardsData {
    sectionA: EntityData;
    sectionB: EntityData;
}

interface ClientProfileViewInterface {
    allCardsData: AllCardsData; 
    handleUpdate: (cardId: string, key: string, value: string) => void;
    // Use the generic Column/Config type we defined earlier
    generateConfig: (data: EntityData) => InputConfig[]; 
}
export const ClientProfileView: React.FC<ClientProfileViewInterface> = ({allCardsData, handleUpdate, generateConfig }) => {
  return (
    
        <div className='p-8'>
            <div className='grid grid-cols-2 gap-6'>
                <CardWithInput 
                    cardId="sectionA" 
                    headerText="Primary Entity"
                    inputs={generateConfig(allCardsData.sectionA)}
                    onInputChange={(cardId, key, val) => handleUpdate(cardId, key, val)}
                    isEditable={true}
                    dynamicStyle= "border-blue-200"
                />
                <CardWithInput 
                    cardId="sectionB" 
                    headerText="Primary Entity 1"
                    inputs={generateConfig(allCardsData.sectionB)}
                    onInputChange={(cardId, key, val) => handleUpdate(cardId, key, val)}
                    isEditable={false} 
                    dynamicStyle= "border-emerald-200"
                />
            </div>
            <div className='space-y-2'>
                <span className='text-gray-700 whitespace-nowrap min-w-35 pt-2'>
                        dgjkdhkjg
                </span>
                <div className='flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900'>
                        heeleel
                </div>
            </div>
    </div>
  )
}
