import React, { useState, useEffect } from 'react';
import { useTradeStore } from '../../store/useTradeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { DashboardHeader } from './DashboardHeader';
import { AddTradeForm } from '../trade/AddTradeForm';
import { TradeTable } from '../trade/TradeTable';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { Trade } from '../../types/trade';

export function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuthStore();
  const { trades, loading, error, fetchTrades, addTrade } = useTradeStore();

  useEffect(() => {
    if (user) {
      fetchTrades(user.id);
    }
  }, [user, fetchTrades]);

  const handleAddTrade = async (tradeData: Omit<Trade, 'id'>) => {
    if (!user) return;
    await addTrade(user.id, tradeData);
    setShowAddForm(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-[95%] mx-auto px-4 py-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardHeader 
        showAddForm={showAddForm}
        onToggleAddForm={() => setShowAddForm(!showAddForm)}
      />

      {showAddForm && <AddTradeForm onSubmit={handleAddTrade} />}

      <div className="mt-8">
        <TradeTable trades={trades} />
      </div>
    </div>
  );
}