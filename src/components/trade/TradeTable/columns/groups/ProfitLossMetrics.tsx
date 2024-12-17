import { createColumnHelper } from '@tanstack/react-table';
import type { Trade } from '../../../../../types/trade';
import { calculateTradeMetrics, formatCurrency, formatPercentage } from '../../../../../lib/utils';
import { getProfitLossStyle } from '../../../../../lib/styleUtils';

const columnHelper = createColumnHelper<Trade>();

export const useProfitLossMetricsColumns = () => [
  columnHelper.accessor((row) => calculateTradeMetrics(row).accrualProfitLoss, {
    id: 'accrualProfitLoss',
    header: 'Accrual P/L',
    cell: (info) => (
      <span className={getProfitLossStyle(info.getValue())}>
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor((row) => calculateTradeMetrics(row).profitLoss, {
    id: 'profitLoss',
    header: 'P/L',
    cell: (info) => info.getValue() ? (
      <span className={getProfitLossStyle(info.getValue())}>
        {formatCurrency(info.getValue())}
      </span>
    ) : '-',
  }),
  columnHelper.accessor((row) => calculateTradeMetrics(row).profitPercentage, {
    id: 'profitPercentage',
    header: 'Profit %',
    cell: (info) => (
      <span className={getProfitLossStyle(info.getValue())}>
        {formatPercentage(info.getValue())}
      </span>
    ),
  }),
];