import { createColumnHelper } from '@tanstack/react-table';
import type { Trade } from '../../../../types/trade';
import { formatCurrency } from '../../../../lib/utils';
import { getBoughtRateStyle, getSellTargetStyle } from '../../../../lib/styleUtils';

const columnHelper = createColumnHelper<Trade>();

export const usePriceDetailsColumns = () => [
  columnHelper.accessor('boughtRate', {
    header: 'Bought Rate',
    cell: (info) => (
      <span className={getBoughtRateStyle(info.row.original.currentPrice, info.getValue())}>
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor('sellTarget', {
    header: 'Sell Target',
    cell: (info) => (
      <span className={getSellTargetStyle(info.getValue(), info.row.original.boughtRate)}>
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
];