"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HardDriveUpload, Loader2 } from 'lucide-react';
import { openDB, IDBPDatabase } from 'idb'; 
import { LabelHeader } from './LabelHeader';
import { UploadDoc } from './Upload';
import { ClientProfileView, AllCardsData, InputConfig, EntityData } from './tabs/ClientProfileView';
import { ProductsView } from './tabs/ProductsView';
import { ConnectedPartiesView } from './tabs/ConnectedPartiesView';
import { useIdleTimer } from './hooks/useIdleTimer';
import { AI_TECH_CONSTANTS, DB_CONFIG } from './constants';
import { SessionTimoutModal } from './SessionTimoutModal';
import { ExtractedRecord } from '../Interface';

interface Step { id: number; stepperNumber: number; stepperText?: string; }
interface MainInfoInterface { activeStepDetails: Step | undefined; userId: number; }
interface SessionData {
    step: number;
    rowCount: number;
    allCardsData: AllCardsData;
    fileInfo: { name: string | null; time: string | null; size?: number };
}

export const MainInfo: React.FC<MainInfoInterface> = ({ activeStepDetails, userId }) => {
    const [isRestored, setIsRestored] = useState(false); 
    const [showIdleModal, setShowIdleModal] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [isProcessing, setIsProcessing] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [tableData, setTableData] = useState<ExtractedRecord[]>([]); 
    const [uploadedFile, setUploadedFile] = useState<{ name: string | null, time: string | null, size?: number }>({
        name: null, time: null
    });
    const [allCardsData, setAllCardsData] = useState<AllCardsData>({
        sectionA: { clientName: "Pending...", entityType: "Pending..." },
        sectionB: { clientName: "Pending...", entityType: "Pending..." }
    });
    const dbRef = useRef<IDBPDatabase | null>(null);
    const getDB = useCallback(async () => {
        if (dbRef.current) return dbRef.current;
        dbRef.current = await openDB(DB_CONFIG.NAME, DB_CONFIG.VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(DB_CONFIG.STORES.LARGE_DATA)) db.createObjectStore(DB_CONFIG.STORES.LARGE_DATA);
                if (!db.objectStoreNames.contains(DB_CONFIG.STORES.SESSION_META)) db.createObjectStore(DB_CONFIG.STORES.SESSION_META);
            },
        });
        return dbRef.current;
    }, []);

    const saveToStorage = useCallback(async (data: SessionData) => {
        if (!userId) return;
        try {
            const db = await getDB();
            await db.put(DB_CONFIG.STORES.SESSION_META, { ...data, timestamp: Date.now() }, userId);
        } catch (error) { console.error("Persistence failed:", error); }
    }, [userId, getDB]);

    useEffect(() => {
        const restoreData = async () => {
            if (!userId) return;
            try {
                const db = await getDB();
                const [savedMeta, savedRecords] = await Promise.all([
                    db.get(DB_CONFIG.STORES.SESSION_META, userId),
                    db.get(DB_CONFIG.STORES.LARGE_DATA, userId.toString())
                ]);

                if (savedMeta) {
                    setRowCount(savedMeta.rowCount);
                    setAllCardsData(savedMeta.allCardsData);
                    setUploadedFile(savedMeta.fileInfo);
                }
                if (savedRecords) setTableData(savedRecords as ExtractedRecord[]);
            } finally { setIsRestored(true); }
        };
        restoreData();
    }, [userId, getDB]);

    const handleUpdate = useCallback((cardId: string, key: string, value: string) => {
        setAllCardsData(prev => ({
            ...prev,
            [cardId]: { ...prev[cardId as keyof AllCardsData], [key]: value }
        }));
    }, []);

    const generateConfig = (data: EntityData): InputConfig[] => [
        { label: "Client Name", value: data.clientName, key: "clientName", isEditable: true },
        { label: "Entity Type", value: data.entityType, key: "entityType", isEditable: true },
    ];

    const handleFileUpload = async (file: File | null, time: string | null) => {
        const db = await getDB();
        if (!file) {
            setTableData([]);
            setRowCount(0);
            setUploadedFile({ name: null, time: null });
            await db.delete(DB_CONFIG.STORES.LARGE_DATA, userId.toString());
            await db.delete(DB_CONFIG.STORES.SESSION_META, userId);
            return;
        }
        setIsProcessing(true);
        try {
            await new Promise(r => setTimeout(r, 2000)); 
            const mockRows: ExtractedRecord[] = Array.from({ length: 1000 }, (_, i) => ({ 
                id: i,
                businessLine: `text`, 
                productName: `Item ${i}`, 
                subProductName: 'Verified '
            }));

            await db.put(DB_CONFIG.STORES.LARGE_DATA, mockRows, userId.toString());

            const newFileInfo = { name: file.name, time, size: file.size };
            const newCardsData = {
                sectionA: { clientName: "Pacific Financial", entityType: "Private" },
                sectionB: { clientName: "Atlantic Services", entityType: "Public" }
            };

            setTableData(mockRows);
            setRowCount(mockRows.length);
            setUploadedFile(newFileInfo);
            setAllCardsData(newCardsData);
            
            await saveToStorage({
                step: activeStepDetails?.stepperNumber || 1,
                rowCount: mockRows.length,
                allCardsData: newCardsData,
                fileInfo: newFileInfo
            });

            setActiveTab('products'); 
        } finally { setIsProcessing(false); }
    };

    const handleHardReset = useCallback(async () => {
        const db = await getDB();
        await db.clear(DB_CONFIG.STORES.LARGE_DATA);
        await db.delete(DB_CONFIG.STORES.SESSION_META, userId);
        window.location.reload();
    }, [userId, getDB]);

    const { resetTimers } = useIdleTimer(AI_TECH_CONSTANTS.USER_IDEAL_TIME, AI_TECH_CONSTANTS.USER_TIMOUT, () => setShowIdleModal(true), handleHardReset);

    return (
        <div className='relative bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden min-h-100'>
            <div className='bg-linear-to-r from-slate-50 to-blue-50 border-b border-slate-200 px-8 py-6 flex'>
                <div className='bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-lg mr-5'>
                    Step {activeStepDetails?.stepperNumber}
                </div>
                <h2 className='text-2xl font-semibold text-slate-800 p-1.5'>
                    {activeStepDetails?.stepperText}
                </h2>
            </div>
            {showIdleModal && <SessionTimoutModal setShowIdleModal={setShowIdleModal} resetTimers={resetTimers} userId={userId} handleHardReset={handleHardReset} />}
            {isProcessing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-2" />
                        <p className="text-sm font-medium text-slate-600">AI Extracting Records...</p>
                    </div>
                </div>
            )}
            <div className="p-8">
                {activeStepDetails?.stepperNumber === 1 && (
                    <>
                        <LabelHeader labelText='Upload document.' labelIcon={<HardDriveUpload size={20}/>}/>
                        <div className='mt-8 pt-6 border-t border-slate-200'>
                            <UploadDoc 
                                onUpload={handleFileUpload} 
                                isProcessing={isProcessing} 
                                initialFileName={uploadedFile.name}
                                initialUploadTime={uploadedFile.time}
                            />
                        </div>
                        {rowCount > 0 && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="flex gap-4 mt-8 border-b border-slate-200">
                                    {['profile', 'products', 'parties'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-2 px-4 capitalize transition-all ${
                                                activeTab === tab 
                                                ? 'border-b-2 border-blue-600 text-blue-600 font-bold' 
                                                : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="py-4">
                                    {activeTab === 'profile' && (
                                        <ClientProfileView 
                                            allCardsData={allCardsData} 
                                            handleUpdate={handleUpdate}
                                            generateConfig={generateConfig}
                                        />
                                    )}
                                    {activeTab === 'products' && (
                                        <ProductsView 
                                            data={tableData} 
                                            rowCount={rowCount} 
                                        />
                                    )}
                                    {activeTab === 'parties' && (
                                        <ConnectedPartiesView 
                                            data={tableData} 
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
