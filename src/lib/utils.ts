import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInDays } from 'date-fns';
import type { Trade, TradeMetrics } from '../types/trade';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateFees(amount: number, price: number, fixedFee: number, percentageFee: number): number {
  const transactionValue = amount * price;
  return fixedFee + (transactionValue * (percentageFee / 100));
}

export function calculateTradeMetrics(trade: Trade): TradeMetrics {
  const daysOpen = trade.closedDate
    ? differenceInDays(trade.closedDate, trade.boughtDate)
    : differenceInDays(new Date(), trade.boughtDate);

  const boughtValue = trade.amount * trade.boughtRate;
  const sellTargetValue = trade.amount * trade.sellTarget;
  const accrualProfitLoss = sellTargetValue - boughtValue;
  
  const profitLoss = trade.status === 'closed' ? accrualProfitLoss : undefined;
  const profitPercentage = (accrualProfitLoss / boughtValue) * 100;
  
  const distanceBase = trade.currentPrice
    ? ((trade.currentPrice - trade.boughtRate) / trade.boughtRate) * 100
    : 0;
    
  const distanceGoal = ((trade.sellTarget - trade.boughtRate) / trade.boughtRate) * 100;

  // Calculate net value after fees
  const netValue = trade.status === 'closed'
    ? sellTargetValue - boughtValue - trade.fees.totalFees
    : boughtValue - trade.fees.totalFees;

  return {
    daysOpen,
    boughtValue,
    sellTargetValue,
    accrualProfitLoss,
    profitLoss,
    profitPercentage,
    distanceBase,
    distanceGoal,
    netValue,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}