import React from 'react';
import { Info } from 'lucide-react';
import type { Trade } from '../../../types/trade';
import { getCoinStyle, getStatusStyle, getCategoryStyle } from '../../../lib/styleUtils';

interface TradeInfoCellProps {
  trade: Trade;
  showName?: boolean;
  showStatus?: boolean;
  showCategory?: boolean;
}

export function TradeInfoCell({ 
  trade, 
  showName = true, 
  showStatus = true, 
  showCategory = true 
}: TradeInfoCellProps) {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-2">
        <span className={`text-base font-medium ${getCoinStyle(trade.coin)}`}>
          {trade.coin}
        </span>
        {showName && (
          <span className="text-sm text-gray-600">
            {trade.name}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2 text-xs">
        {showStatus && (
          <span className={`px-2 py-0.5 rounded-full ${getStatusStyle(trade.status)}`}>
            {trade.status}
          </span>
        )}
        {showCategory && (
          <span className={`px-2 py-0.5 rounded-full ${getCategoryStyle(trade.category)}`}>
            {trade.category}
          </span>
        )}
      </div>
    </div>
  );
}