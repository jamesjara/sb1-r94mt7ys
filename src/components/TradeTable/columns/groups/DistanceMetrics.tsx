import { createColumnHelper } from '@tanstack/react-table';
import type { Trade } from '../../../../types/trade';
import { calculateTradeMetrics, formatPercentage } from '../../../../lib/utils';
import { getProfitLossStyle, getDistanceGoalStyle } from '../../../../lib/styleUtils';

const columnHelper = createColumnHelper<Trade>();

export const useDistanceMetricsColumns = () => [
  columnHelper.accessor((row) => calculateTradeMetrics(row).distanceBase, {
    id: 'distanceBase',
    header: 'Distance Base',
    cell: (info) => (
      <span className={getProfitLossStyle(info.getValue())}>
        {formatPercentage(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor((row) => calculateTradeMetrics(row).distanceGoal, {
    id: 'distanceGoal',
    header: 'Distance Goal',
    cell: (info) => (
      <span className={getDistanceGoalStyle(info.getValue())}>
        {formatPercentage(info.getValue())}
      </span>
    ),
  }),
];