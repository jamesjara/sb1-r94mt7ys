import axios from 'axios';
import type { BitstampTicker, BitstampPair } from './types';

const BITSTAMP_API = 'https://www.bitstamp.net/api/v2';

export const bitstampApi = {
  async getTradingPairs(): Promise<BitstampPair[]> {
    const { data } = await axios.get<BitstampPair[]>(`${BITSTAMP_API}/trading-pairs-info/`);
    return data;
  },

  async getTicker(pair: string): Promise<BitstampTicker> {
    const { data } = await axios.get<BitstampTicker>(`${BITSTAMP_API}/ticker/${pair}/`);
    return data;
  },
};