"use client"
import React, { useState } from 'react'
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Card'
import { ButtonComponent } from '../../../components/Button'
import { RefreshCcw, ChartColumn, CircleCheckBig, Clock, CircleAlert, TrendingUp, Users, FileText, Shield } from 'lucide-react';
import { UserDetails } from '../../../components/UserDetails';


export const  Dashboard= () => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const onClickUserDetails = ({ userId }: { userId: number }) => {
       setSelectedUserId(userId)
    }
  return (
    <div className='dashboard-kyc m-5 flex flex-col gap-6 w-full'>
        {!selectedUserId &&
        <div className='dahboard-main'>
            <div className='header-component'>
                <Header styles='top-0 left-0 fixed' headerLabel={"AI KYC"} headerText={"Compliance Management System • Banking Operations"} headerIcon={<Shield className='w-10 h-10 text-white'/>} headerItemLabel={"Logged in as"} headerItemText={"John Doe"}    />
            </div>
            <div className='card-refresh-list'>
                <Card display='flex' content={<ButtonComponent classStyle="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center gap-2 text-white w-fit" text='Reset All Data' icon={<RefreshCcw/>}/>}/>
            </div>
            <div className='dashboard-number-list flex flex-row items-start justify-start w-full gap-4 mt-5'>
                <div className='flex-1 block'>
                    <Card >
                        <div className='flex justify-between items-start mb-4'>
                            <div className='uppercase text-xs font-semibold text-slate-500 tracking-wider'>
                                Total Clients
                            </div>
                            <div className='text-slate-400'>
                                <ChartColumn size={20} color='#2b7fff' />
                            </div>
                        </div>
                        <div className='text-3xl font-bold text-slate-900'>
                            4
                        </div>
                    </Card>
                </div>
                <div className='flex-1 block'>
                    <Card >
                        <div className='flex justify-between items-start mb-4'>
                            <div className='uppercase text-xs font-semibold text-slate-500 tracking-wider'>
                                Completed
                            </div>
                            <div className='text-slate-400'>
                                <CircleCheckBig size={20} color='#00bd7d' />
                            </div>
                        </div>
                        <div className='text-3xl font-bold text-slate-900'>
                            4
                        </div>
                    </Card>
                </div>
               <div className='flex-1 block'>
                    <Card >
                        <div className='flex justify-between items-start mb-4'>
                            <div className='uppercase text-xs font-semibold text-slate-500 tracking-wider'>
                                In Progress
                            </div>
                            <div className='text-slate-400'>
                                <Clock size={20} color='#2b7fff' />
                            </div>
                        </div>
                        <div className='text-3xl font-bold text-slate-900'>
                            4
                        </div>
                    </Card>
                </div>
                <div className='flex-1 block'>
                    <Card >
                        <div className='flex justify-between items-start mb-4'>
                            <div className='uppercase text-xs font-semibold text-slate-500 tracking-wider'>
                                Overdue
                            </div>
                            <div className='text-slate-400'>
                                <CircleAlert size={20} color='#fb2b37' />
                            </div>
                        </div>
                        <div className='text-3xl font-bold text-slate-900'>
                            4
                        </div>
                    </Card>
                </div>
                <div className='flex-1 block'>
                    <Card >
                        <div className='flex justify-between items-start mb-4'>
                            <div className='uppercase text-xs font-semibold text-slate-500 tracking-wider'>
                                New
                            </div>
                            <div className='text-slate-400'>
                                <TrendingUp size={20} color='#62748e' />
                            </div>
                        </div>
                        <div className='text-3xl font-bold text-slate-900'>
                            4
                        </div>
                    </Card>
                </div>
            </div>
            <div className='dashboard-table-component overflow-hidden animate-slide-in mt-5'>
                <div className='px-6 py-5 bg-linear-to-r from-slate-50 to-slate-100 border-b border-slate-200 flex'>
                    <div className=' items-center justify-between block w-full'>
                        <h2 className='text-slate-900 text-xl font-bold'>
                            Assigned Clients
                            
                        </h2>
                        <p className='text-slate-600 text-sm mt-1'>
                                4 clients assigned to Maker
                        </p>
                    </div>
                    <div className=' flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200'>
                        <span>
                            <Users size={12} color='#2b7fff'/>
                        </span>
                        <span>
                            4
                        </span>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-slate-100 border-b border-slate-200'>
                                <th className='px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider'>
                                   Client Name
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider'>
                                    Type
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider'>
                                    KYC Review Status
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider'>
                                    Due Date
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider'>
                                    RAG Flag
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider'>
                                    Notes
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-200 bg-white'>
                            <tr className='table-row-hover cursor-pointer' onClick={() => onClickUserDetails({ userId: 1 })}>
                                <td className='px-6 py-4 '>
                                    <div className='flex'>
                                        <div className='w-10 h-10 rounded-lg bg-linear-to-br  flex items-center justify-center shadow-md mr-3'>
                                            <FileText width={30} color='#2b7fff'/>
                                        </div>
                                        <div>
                                            <div className='font-semibold text-slate-900'>
                                                Pacific Financial Services
                                            </div>
                                            <div className='text-xs text-slate-500'>
                                                Investment Services
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 '>
                                    <span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm font-medium'>
                                        NBFI
                                    </span>
                                </td>
                                <td className='px-6 py-4 '>
                                    <div className=' border rounded-lg bg-slate-50 text-slate-700 border-slate-200'>
                                        <FileText width={10} color='#324158'/>
                                        <span>New</span>
                                    </div>
                                    
                                </td>
                                <td className='px-6 py-4 '>
                                    <div className='flex items-center gap-2'>
                                        <Clock width={12} color='#324158'/>
                                        <span className='text-slate-700 font-medium text-sm'>
                                            Jan 22, 2026
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-sm font-semibold">On Track</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <textarea placeholder="Add notes..."  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm text-slate-700 placeholder-slate-400 bg-slate-50 hover:bg-white transition-colors">
                                    </textarea>
                                </td>
                            </tr>
                            <tr className='table-row-hover cursor-pointer'>
                                <td className='px-6 py-4 '>
                                    <div className='flex'>
                                        <div className='w-10 h-10 rounded-lg bg-linear-to-br  flex items-center justify-center shadow-md mr-3'>
                                            <FileText width={30} color='#2b7fff'/>
                                        </div>
                                        <div>
                                            <div className='font-semibold text-slate-900'>
                                                Pacific Financial Services
                                            </div>
                                            <div className='text-xs text-slate-500'>
                                                Investment Services
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 '>
                                    <span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm font-medium'>
                                        NBFI
                                    </span>
                                </td>
                                <td className='px-6 py-4 '>
                                    <div className=' border rounded-lg bg-slate-50 text-slate-700 border-slate-200'>
                                        <FileText width={10} color='#324158'/>
                                        <span>New</span>
                                    </div>
                                    
                                </td>
                                <td className='px-6 py-4 '>
                                    <div className='flex items-center gap-2'>
                                        <Clock width={12} color='#324158'/>
                                        <span className='text-slate-700 font-medium text-sm'>
                                            Jan 22, 2026
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-sm font-semibold">On Track</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <textarea placeholder="Add notes..."  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm text-slate-700 placeholder-slate-400 bg-slate-50 hover:bg-white transition-colors">
                                    </textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>}

        {selectedUserId && 
            <UserDetails userId={selectedUserId} onBack={() => setSelectedUserId(null)} />
        }
        
    </div>
  )
}
