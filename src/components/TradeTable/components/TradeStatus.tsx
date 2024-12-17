import React from 'react';
import { styles } from '../../../lib/styles/tradeStyles';
import type { TradeStatus } from '../../../types/trade';

interface TradeStatusProps {
  status: TradeStatus;
}

export function TradeStatus({ status }: TradeStatusProps) {
  return (
    <span className={`px-2 py-0.5 rounded-full ${styles.status[status]}`}>
      {status}
    </span>
  );
}