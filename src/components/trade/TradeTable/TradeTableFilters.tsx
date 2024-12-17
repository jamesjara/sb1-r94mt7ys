import React from 'react';
import { Filter } from 'lucide-react';
import { useTradeTableStore } from '../../../store/useTradeTableStore';

const columnGroups = [
  { key: 'showName', label: 'Name' },
  { key: 'showStatus', label: 'Status' },
  { key: 'showCategory', label: 'Category' },
  { key: 'showTimingDetails', label: 'Timing Details' },
  { key: 'showTradeVolume', label: 'Trade Volume' },
  { key: 'showPriceDetails', label: 'Price Details' },
  { key: 'showValueCalculations', label: 'Value Calculations' },
  { key: 'showProfitLoss', label: 'Profit/Loss' },
  { key: 'showDistanceMetrics', label: 'Distance Metrics' },
  { key: 'showAdditionalSettings', label: 'Additional Settings' },
] as const;

export function TradeTableFilters() {
  const store = useTradeTableStore();

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Column Visibility:</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {columnGroups.map(({ key, label }) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={store[key]}
              onChange={() => store.toggleColumn(key)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}