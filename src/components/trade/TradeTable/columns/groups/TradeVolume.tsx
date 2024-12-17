import { createColumnHelper } from '@tanstack/react-table';
import type { Trade } from '../../../../../types/trade';

const columnHelper = createColumnHelper<Trade>();

export const useTradeVolumeColumns = () => [
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue().toFixed(2),
  }),
];