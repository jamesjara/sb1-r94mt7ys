export type TradeStatus = 'open' | 'closed';
export type TradeCategory = 'long' | 'short';

export interface Trade {
  id: string;
  name: string;
  coin: string;
  status: TradeStatus;
  category: TradeCategory;
  createdDate: Date;
  boughtDate: Date; // Added bought date
  closedDate?: Date;
  amount: number;
  boughtRate: number;
  sellTarget: number;
  fees: {
    fixedFee: number;
    percentageFee: number;
    totalFees: number;
  };
  stopLoss: number;
  currentPrice?: number;
}

export interface TradeMetrics {
  daysOpen: number;
  boughtValue: number;
  sellTargetValue: number;
  accrualProfitLoss: number;
  profitLoss?: number;
  profitPercentage: number;
  distanceBase: number;
  distanceGoal: number;
  netValue: number; // Added net value after fees
}