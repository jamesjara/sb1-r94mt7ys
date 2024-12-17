import { createColumnHelper } from '@tanstack/react-table';
import type { Trade } from '../../../../types/trade';
import { formatCurrency } from '../../../../lib/utils';
import { getStopLossStyle } from '../../../../lib/styleUtils';

const columnHelper = createColumnHelper<Trade>();

export const useAdditionalSettingsColumns = () => [
  columnHelper.accessor('fees.totalFees', {
    header: 'Fees',
    cell: (info) => formatCurrency(info.getValue()),
  }),
  columnHelper.accessor('stopLoss', {
    header: 'Stop Loss',
    cell: (info) => (
      <span className={getStopLossStyle(info.row.original.currentPrice, info.getValue())}>
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
];