import { createColumnHelper } from '@tanstack/react-table';
import type { Trade } from '../../../../../types/trade';
import { TradeInfoCell } from '../../cells/TradeInfoCell';
import { useTradeTableStore } from '../../../../../store/useTradeTableStore';

const columnHelper = createColumnHelper<Trade>();

export const useTradeBasicsColumns = () => {
  const { showName, showStatus, showCategory } = useTradeTableStore();

  return [
    columnHelper.accessor('coin', {
      header: 'Trade Info',
      cell: (info) => (
        <TradeInfoCell
          trade={info.row.original}
          showName={showName}
          showStatus={showStatus}
          showCategory={showCategory}
        />
      ),
    }),
  ];
};