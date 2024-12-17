import { create } from 'zustand';

interface ColumnVisibility {
  showName: boolean;
  showStatus: boolean;
  showCategory: boolean;
  showTimingDetails: boolean;
  showTradeVolume: boolean;
  showPriceDetails: boolean;
  showValueCalculations: boolean;
  showProfitLoss: boolean;
  showDistanceMetrics: boolean;
  showAdditionalSettings: boolean;
}

interface TradeTableState extends ColumnVisibility {
  toggleColumn: (key: keyof ColumnVisibility) => void;
}

export const useTradeTableStore = create<TradeTableState>((set) => ({
  // Initial visibility state
  showName: true,
  showStatus: true,
  showCategory: true,
  showTimingDetails: true,
  showTradeVolume: true,
  showPriceDetails: true,
  showValueCalculations: true,
  showProfitLoss: true,
  showDistanceMetrics: true,
  showAdditionalSettings: true,

  // Toggle function
  toggleColumn: (key) => set((state) => ({ [key]: !state[key] })),
}));