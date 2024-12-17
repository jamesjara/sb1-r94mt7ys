import { MAJOR_COINS } from './constants/tradeConstants';
import type { Trade } from '../types/trade';

export function getCoinStyle(coin: string) {
  return MAJOR_COINS.includes(coin) ? 'font-bold text-orange-600' : 'bg-gray-100 px-2 py-0.5 rounded';
}

export function getStatusStyle(status: string) {
  return status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
}

export function getCategoryStyle(category: string) {
  return category === 'long' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800';
}

export function getDaysOpenStyle(days: number) {
  if (days > 90) return 'text-red-600 font-medium';
  if (days > 30) return 'text-yellow-600 font-medium';
  return 'text-gray-600';
}

export function getBoughtRateStyle(currentPrice: number | undefined, boughtRate: number) {
  if (!currentPrice) return 'text-gray-600';
  return currentPrice > boughtRate ? 'text-green-600 font-medium' : 'text-red-600 font-medium';
}

export function getSellTargetStyle(sellTarget: number, boughtRate: number) {
  if (!sellTarget) return 'text-gray-400';
  return sellTarget > boughtRate ? 'text-blue-600 font-medium' : 'text-gray-600';
}

export function getSellTargetValueStyle(sellTargetValue: number, boughtValue: number) {
  return sellTargetValue > boughtValue ? 'text-green-600 font-medium' : 'text-red-600 font-medium';
}

export function getProfitLossStyle(value: number) {
  return value >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium';
}

export function getDistanceGoalStyle(value: number) {
  if (value > 10) return 'text-blue-600 font-medium';
  if (value > 0) return 'text-yellow-600 font-medium';
  return 'text-gray-600';
}

export function getStopLossStyle(currentPrice: number | undefined, stopLoss: number) {
  if (!currentPrice || !stopLoss) return 'text-gray-600';
  return currentPrice < stopLoss ? 'text-red-600 font-bold' : 'text-gray-600';
}