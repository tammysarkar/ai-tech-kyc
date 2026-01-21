'use client';
import React, { ReactNode } from 'react';

// Define the structure for your columns
interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T; // Used for the unique React 'key'
  dynamicStyle?: string
}

export const DynamicTable = <T extends object>({ columns, data, keyField,
    dynamicStyle
 }: TableProps<T>) => {
  return (
    <div className='table-component overflow-hidden rounded-lg border border-slate-200 shadow-sm'>
      <table className="w-full text-sm">
        <thead className={`bg-linear-to-r  text-white ${dynamicStyle}`}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-3 text-left font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={String(item[keyField])} className="hover:bg-blue-50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 text-slate-700">
                    {/* Render via accessor function (for badges/icons) or by key string */}
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
