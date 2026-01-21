import React, { useState } from 'react'
import { LabelHeader } from './LabelHeader';
import { HardDriveUpload } from 'lucide-react';
import { UploadDoc } from './Upload';
import { DynamicTable } from './Table';
import { Input } from './Input';
import { CardWithInput } from './CardWithInput';
import { ClientProfileView } from './tabs/ClientProfileView';
import { ProductsView } from './tabs/ProductsView';
import { ConnectedPartiesView } from './tabs/ConnectedPartiesView';

interface Step {
    id: number;
    stepperNumber: number;
    stepperText?: string;
    actionDone?: boolean;
    actionProgress?: boolean
}
interface MainInfoInterface {
    activeStepDetails: Step | undefined; 
}

interface UserRow {
  id: number;
  name?: string;
  role?: string;
  status?: string;
  designation?: string;
  idNumber?: string;
  idType?: string;
}

const USER_COLUMNS = [
  { header: 'Business Line', accessor: 'name' as const },
  { 
    header: 'Product Name', 
    accessor: (user: UserRow) => (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
        {user.role}
      </span>
    )
  },
    { 
    header: 'Sub-Product Name', 
    accessor: (user: UserRow) => (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
        {user.designation}
      </span>
    )
  },
];

const userData = [
  { id: 1, name: 'Alexander Chen', role: 'CEO', designation: 'abc' },
  { id: 2, name: 'Tammy Jones', role: 'CTO' },
];


export const MainInfo: React.FC<MainInfoInterface> = ({activeStepDetails }) => {
        const [allCardsData, setAllCardsData] = useState({
        sectionA: { clientName: "Pacific Financial", entityType: "Private" },
        sectionB: { clientName: "Atlantic Services", entityType: "Public" }
    });

    // This function takes a data object and returns the array your component needs
const generateConfig = (data: { clientName: string; entityType: string }) => [
    { 
        key: 'clientName', 
        label: 'Full Client Name', 
        value: data.clientName, 
    },
    { 
        key: 'entityType', 
        label: 'Entity Legal Type', 
        value: data.entityType, 
    }
];


    // Inside your Parent (e.g., UserDetails)
const handleUpdate = (section: string, key: string, newValue: string) => {
    setAllCardsData((prev) => ({
        ...prev, // Keep other sections
        [section]: {
            ...prev[section as keyof typeof prev], // Keep other fields in this section
            [key]: newValue // Update only the field being typed in
        }
    }));
};

     const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Client Profile' },
        { id: 'products', label: 'Products' },
        { id: 'parties', label: 'Connected Parties' },
    ];

    const [uploadedFile, setUploadedFile] = useState<{ file: File | null, time: string | null }>({
        file: null,
        time: null
    });

    // 2. Define the handler function
    const handleFileUpload = (file: File | null, time: string | null) => {
        setUploadedFile({ file, time });
        console.log("Parent received file:", file?.name, "at", time);
        
        // Example: If a file exists, you could automatically unlock a card
        // or trigger your AI Confidence logic here.
    };

  return (
    <div className='bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden'>
        <div className='bg-linear-to-r from-slate-50 to-blue-50 border-b border-slate-200 px-8 py-6 flex'>
            <div className='bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-lg'>
                Step {activeStepDetails?.stepperNumber}
            </div>
            <h2 className='text-2xl font-semibold text-slate-800'>
                {activeStepDetails?.stepperText}
            </h2>
        </div>
        {activeStepDetails?.stepperNumber === 1 &&
        <div className='p-8'>
            <div className='space-y-6'>
                <LabelHeader labelText='Upload the Client profile document for this client.' labelIcon={<HardDriveUpload size={20} />}/>
            </div>
            <div className='flex justify-between mt-8 pt-6 border-t border-slate-200'>
                <UploadDoc onFileChange={handleFileUpload} />
            </div>
            {uploadedFile.file && 
            <>
                <div className='mt-6 border border-gray-200 rounded-lg p-8'>
                <div className='bg-linear-to-r from-blue-50 to-emerald-50 p-5 border-b border-blue-200'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-blue-600 text-white rounded-lg p-2'>

                        </div>
                        <div>
                            <h3 className="text-slate-800 font-semibold text-lg">
                                Extracted Client Profile Data
                            </h3>
                            <p className="text-slate-600 text-sm mt-0.5">
                                🤖 Data extracted from uploaded document via AI OCR processing
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex border-b border-slate-200 bg-white">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-4 border-b-2 transition-all font-medium ${
                            activeTab === tab.id
                                ? 'border-blue-600 text-blue-600 bg-blue-50'
                                : 'border-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* 3. Conditional Content Display */}
            <div className="p-6 bg-white">
                {activeTab === 'profile' && <ClientProfileView allCardsData={allCardsData}
                    handleUpdate={handleUpdate}
                    generateConfig={generateConfig} />}
                {activeTab === 'products' && <ProductsView />}
                {activeTab === 'parties' && <ConnectedPartiesView />}
            </div>
            </>}
        </div>}
        {activeStepDetails?.stepperNumber === 2 && 
            <div className='p-8'>
                {"hello"}
            </div>

        }


{/* <DynamicTable columns={USER_COLUMNS} data={userData} keyField="id" dynamicStyle={"from-blue-600 to-blue-700"} />
<DynamicTable columns={USER_COLUMNS} data={userData} keyField="id" dynamicStyle={"from-emerald-600 to-emerald-700"} /> */}
    </div>
  )
}





