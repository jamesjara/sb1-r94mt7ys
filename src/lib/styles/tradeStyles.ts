import { DAYS_THRESHOLDS, DISTANCE_GOAL_THRESHOLDS } from '../constants/tradeConstants';

export const styles = {
  coin: {
    major: 'font-bold text-orange-600',
    default: 'bg-gray-100',
  },
  status: {
    open: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  },
  category: {
    long: 'bg-blue-100 text-blue-800',
    short: 'bg-red-100 text-red-800',
  },
  profitLoss: {
    profit: 'text-green-600 font-medium',
    loss: 'text-red-600 font-medium',
  },
  daysOpen: {
    normal: '',
    warning: 'text-yellow-600 font-medium',
    danger: 'text-red-600 font-medium',
  },
  price: {
    higher: 'text-green-600',
    lower: 'text-red-600',
    neutral: '',
  },
  sellTarget: {
    higher: 'text-blue-600',
    unset: 'text-gray-400',
  },
  distanceGoal: {
    high: 'text-blue-600',
    medium: 'text-yellow-600',
    low: '',
  },
} as const;

export function getDaysOpenStyle(days: number): string {
  if (days > DAYS_THRESHOLDS.DANGER) return styles.daysOpen.danger;
  if (days > DAYS_THRESHOLDS.WARNING) return styles.daysOpen.warning;
  return styles.daysOpen.normal;
}

export function getDistanceGoalStyle(value: number): string {
  if (value > DISTANCE_GOAL_THRESHOLDS.HIGH) return styles.distanceGoal.high;
  if (value > DISTANCE_GOAL_THRESHOLDS.LOW) return styles.distanceGoal.medium;
  return styles.distanceGoal.low;
}

export function getProfitLossStyle(value: number): string {
  return value >= 0 ? styles.profitLoss.profit : styles.profitLoss.loss;
}