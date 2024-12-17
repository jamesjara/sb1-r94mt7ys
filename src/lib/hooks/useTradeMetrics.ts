import { useMemo } from 'react';
import type { Trade } from '../../types/trade';
import { calculateTradeMetrics } from '../utils';

export function useTradeMetrics(trade: Trade) {
  return useMemo(() => calculateTradeMetrics(trade), [
    trade.amount,
    trade.boughtRate,
    trade.sellTarget,
    trade.currentPrice,
    trade.status,
    trade.createdDate,
    trade.closedDate,
    trade.fees.totalFees,
  ]);
}