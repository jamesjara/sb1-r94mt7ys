import { create } from 'zustand';
import type { Trade } from '../types/trade';
import { tradeService } from '../services/tradeService';

interface TradeStore {
  trades: Trade[];
  loading: boolean;
  error: string | null;
  fetchTrades: (userId: string) => Promise<void>;
  addTrade: (userId: string, trade: Omit<Trade, 'id'>) => Promise<void>;
  updateTrade: (id: string, trade: Partial<Trade>) => Promise<void>;
  removeTrade: (id: string) => Promise<void>;
  closeTrade: (id: string) => Promise<void>;
}

export const useTradeStore = create<TradeStore>((set, get) => ({
  trades: [],
  loading: false,
  error: null,

  fetchTrades: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const trades = await tradeService.getTrades(userId);
      set({ trades });
    } catch (error) {
      set({ error: 'Failed to fetch trades' });
    } finally {
      set({ loading: false });
    }
  },

  addTrade: async (userId: string, trade: Omit<Trade, 'id'>) => {
    try {
      set({ loading: true, error: null });
      const newTrade = await tradeService.addTrade(userId, trade);
      set(state => ({ trades: [...state.trades, newTrade] }));
    } catch (error) {
      set({ error: 'Failed to add trade' });
    } finally {
      set({ loading: false });
    }
  },

  updateTrade: async (id: string, updatedTrade: Partial<Trade>) => {
    try {
      set({ loading: true, error: null });
      await tradeService.updateTrade(id, updatedTrade);
      set(state => ({
        trades: state.trades.map(trade =>
          trade.id === id ? { ...trade, ...updatedTrade } : trade
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update trade' });
    } finally {
      set({ loading: false });
    }
  },

  removeTrade: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await tradeService.deleteTrade(id);
      set(state => ({
        trades: state.trades.filter(trade => trade.id !== id),
      }));
    } catch (error) {
      set({ error: 'Failed to remove trade' });
    } finally {
      set({ loading: false });
    }
  },

  closeTrade: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await tradeService.closeTrade(id);
      set(state => ({
        trades: state.trades.map(trade =>
          trade.id === id
            ? { ...trade, status: 'closed' as const, closedDate: new Date() }
            : trade
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to close trade' });
    } finally {
      set({ loading: false });
    }
  },
}));