export interface BitstampTicker {
  pair: string;
  last: string;
  bid: string;
  ask: string;
  volume: string;
  price_change_percentage_24h: string;
}

export interface BitstampPair {
  name: string;
  url_symbol: string;
  base_decimals: number;
  counter_decimals: number;
  instant_order_counter_decimals: number;
  minimum_order: string;
  trading: string;
  description: string;
}