import { createColumnHelper } from '@tanstack/react-table';
import type { Trade } from '../../../../../types/trade';
import { calculateTradeMetrics, formatCurrency } from '../../../../../lib/utils';
import { getSellTargetValueStyle } from '../../../../../lib/styleUtils';

const columnHelper = createColumnHelper<Trade>();

export const useValueCalculationsColumns = () => [
  columnHelper.accessor((row) => calculateTradeMetrics(row).boughtValue, {
    id: 'boughtValue',
    header: 'Bought Value',
    cell: (info) => formatCurrency(info.getValue()),
  }),
  columnHelper.accessor((row) => calculateTradeMetrics(row).sellTargetValue, {
    id: 'sellTargetValue',
    header: 'Sell Target Value',
    cell: (info) => (
      <span className={getSellTargetValueStyle(
        info.getValue(),
        calculateTradeMetrics(info.row.original).boughtValue
      )}>
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
];