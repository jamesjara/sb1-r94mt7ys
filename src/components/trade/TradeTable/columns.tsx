import { createColumnHelper } from '@tanstack/react-table';
import type { Trade } from '../../../types/trade';
import { TradeInfoCell } from './cells/TradeInfoCell';
import { useTradeTableStore } from '../../../store/useTradeTableStore';
import { useTradeBasicsColumns } from './columns/groups/TradeBasics';
import { useTimingDetailsColumns } from './columns/groups/TimingDetails';
import { useTradeVolumeColumns } from './columns/groups/TradeVolume';
import { usePriceDetailsColumns } from './columns/groups/PriceDetails';
import { useValueCalculationsColumns } from './columns/groups/ValueCalculations';
import { useProfitLossMetricsColumns } from './columns/groups/ProfitLossMetrics';
import { useDistanceMetricsColumns } from './columns/groups/DistanceMetrics';
import { useAdditionalSettingsColumns } from './columns/groups/AdditionalSettings';

export const useTradeColumns = () => {
  const {
    showTimingDetails,
    showTradeVolume,
    showPriceDetails,
    showValueCalculations,
    showProfitLoss,
    showDistanceMetrics,
    showAdditionalSettings,
  } = useTradeTableStore();

  const columns = [
    ...useTradeBasicsColumns(), // Always show trade basics
  ];

  if (showTimingDetails) columns.push(...useTimingDetailsColumns());
  if (showTradeVolume) columns.push(...useTradeVolumeColumns());
  if (showPriceDetails) columns.push(...usePriceDetailsColumns());
  if (showValueCalculations) columns.push(...useValueCalculationsColumns());
  if (showProfitLoss) columns.push(...useProfitLossMetricsColumns());
  if (showDistanceMetrics) columns.push(...useDistanceMetricsColumns());
  if (showAdditionalSettings) columns.push(...useAdditionalSettingsColumns());

  return columns;
};