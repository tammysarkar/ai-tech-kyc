import React, { FC } from 'react';
import { ExtractedRecord } from '../../Interface';

// 1. Import the same interface used in MainInfo
// Or define it here if it's specific to this view

interface ProductsViewProps {
  // Use the interface instead of [] or any[]
  data: ExtractedRecord[];
  // Change rowCount to number if it's passed as a number from MainInfo
  rowCount: number; 
}

export const ProductsView: FC<ProductsViewProps> = ({ data, rowCount }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800"></h3>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {rowCount.toLocaleString()} Total Records
        </span>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="max-h-125 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600 sticky top-0 z-10">
              <tr>
                <th className="p-4 border-b font-semibold text-white">Business Line</th>
                <th className="p-4 border-b font-semibold text-white">Product Name</th>
                <th className="p-4 border-b font-semibold text-white">Sub-Product Name</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.slice(0, 100).map((row, i) => (
                  <tr key={`${row.id}-${i}`}  className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b text-slate-600">#{row.businessLine}</td>
                    <td className="p-4 border-b font-medium text-slate-900">{row.productName || 'N/A'}</td>
                    <td className="p-4 border-b font-medium text-slate-900">{row.subProductName || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500">
                    No data available. Please upload a document.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {data.length > 100 && (
          <div className="p-3 bg-slate-50 text-center text-xs text-slate-500 border-t">
            Showing first 100 records for performance.
          </div>
        )}
      </div>
    </div>
  );
};
