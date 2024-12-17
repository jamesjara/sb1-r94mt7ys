import React from 'react';
import { formatCurrency } from '../../../lib/utils';
import { getProfitLossStyle } from '../../../lib/styles/tradeStyles';

interface TradeValueProps {
  value: number;
  compareValue?: number;
  formatter?: (value: number) => string;
}

export function TradeValue({ 
  value, 
  compareValue,
  formatter = formatCurrency 
}: TradeValueProps) {
  const style = compareValue !== undefined 
    ? getProfitLossStyle(value - compareValue)
    : getProfitLossStyle(value);

  return (
    <span className={style}>
      {formatter(value)}
    </span>
  );
}