import React from 'react';
import { format } from 'date-fns';

interface TradeDateProps {
  date: Date | undefined;
  format?: string;
}

export function TradeDate({ 
  date, 
  format: dateFormat = 'MM/dd/yyyy HH:mm' 
}: TradeDateProps) {
  if (!date) return <span>-</span>;
  return <span>{format(date, dateFormat)}</span>;
}