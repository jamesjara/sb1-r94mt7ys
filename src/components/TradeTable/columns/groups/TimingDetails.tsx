import { createColumnHelper } from '@tanstack/react-table';
import { format, differenceInDays } from 'date-fns';
import type { Trade } from '../../../../types/trade';
import { getDaysOpenStyle } from '../../../../lib/styleUtils';

const columnHelper = createColumnHelper<Trade>();

export const useTimingDetailsColumns = () => [
  columnHelper.accessor('createdDate', {
    header: 'Created Date',
    cell: (info) => format(info.getValue(), 'MM/dd/yyyy HH:mm'),
  }),
  columnHelper.accessor('closedDate', {
    header: 'Closed Date',
    cell: (info) => info.getValue() ? format(info.getValue()!, 'MM/dd/yyyy HH:mm') : '-',
  }),
  columnHelper.accessor((row) => {
    const endDate = row.closedDate || new Date();
    return differenceInDays(endDate, row.createdDate);
  }, {
    id: 'daysOpen',
    header: 'Days Open',
    cell: (info) => (
      <span className={getDaysOpenStyle(info.getValue())}>
        {info.getValue()}
      </span>
    ),
  }),
];