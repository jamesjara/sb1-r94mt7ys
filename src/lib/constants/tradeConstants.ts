export const MAJOR_COINS = ['BTC', 'ETH'] as const;

export const TRADE_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
} as const;

export const TRADE_CATEGORY = {
  LONG: 'long',
  SHORT: 'short',
} as const;

export const DAYS_THRESHOLDS = {
  WARNING: 30,
  DANGER: 90,
} as const;

export const DISTANCE_GOAL_THRESHOLDS = {
  HIGH: 10,
  LOW: 0,
} as const;