import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { Trade } from '../../types/trade';
import { calculateTradeMetrics, formatCurrency, formatPercentage } from '../../lib/utils';
import {
  getCoinStyle,
  getStatusStyle,
  getCategoryStyle,
  getDaysOpenStyle,
  getBoughtRateStyle,
  getSellTargetStyle,
  getSellTargetValueStyle,
  getProfitLossStyle,
  getDistanceGoalStyle,
  getStopLossStyle,
} from '../../lib/styleUtils';

const columnHelper = createColumnHelper<Trade>();

export const columns = [
  // Group 1: Trade Basics
  columnHelper.group({
    header: 'Trade Info',
    columns: [
      columnHelper.accessor('coin', {
        header: 'Coin',
        cell: (info) => (
          <span className={getCoinStyle(info.getValue())}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('name', {
        header: 'Name',
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => (
          <span className={`px-2 py-0.5 rounded-full ${getStatusStyle(info.getValue())}`}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: (info) => (
          <span className={`px-2 py-0.5 rounded-full ${getCategoryStyle(info.getValue())}`}>
            {info.getValue()}
          </span>
        ),
      }),
    ],
  }),

  // Group 2: Timing Details
  columnHelper.group({
    header: 'Timing',
    columns: [
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
        const days = Math.floor((endDate.getTime() - row.createdDate.getTime()) / (1000 * 60 * 60 * 24));
        return days;
      }, {
        id: 'daysOpen',
        header: 'Days Open',
        cell: (info) => (
          <span className={getDaysOpenStyle(info.getValue())}>
            {info.getValue()}
          </span>
        ),
      }),
    ],
  }),

  // Group 3: Trade Details
  columnHelper.group({
    header: 'Trade Details',
    columns: [
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (info) => info.getValue().toFixed(2),
      }),
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
    ],
  }),

  // Group 4: Value Metrics
  columnHelper.group({
    header: 'Value Metrics',
    columns: [
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
    ],
  }),

  // Group 5: Profit/Loss
  columnHelper.group({
    header: 'Profit/Loss',
    columns: [
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
    ],
  }),

  // Group 6: Distance Metrics
  columnHelper.group({
    header: 'Distance Metrics',
    columns: [
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
    ],
  }),

  // Group 7: Additional Info
  columnHelper.group({
    header: 'Additional Info',
    columns: [
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
    ],
  }),
];