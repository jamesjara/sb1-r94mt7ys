import { useTradeTableStore } from '../../../../store/useTradeTableStore';
import { useTradeBasicsColumns } from './groups/TradeBasics';
import { useTimingDetailsColumns } from './groups/TimingDetails';
import { useTradeVolumeColumns } from './groups/TradeVolume';
import { usePriceDetailsColumns } from './groups/PriceDetails';
import { useValueCalculationsColumns } from './groups/ValueCalculations';
import { useProfitLossMetricsColumns } from './groups/ProfitLossMetrics';
import { useDistanceMetricsColumns } from './groups/DistanceMetrics';
import { useAdditionalSettingsColumns } from './groups/AdditionalSettings';

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