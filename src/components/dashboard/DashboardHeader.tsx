import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserAvatar } from '../common/UserAvatar';
import { AddTradeButton } from '../trade/AddTradeButton';

interface DashboardHeaderProps {
  showAddForm: boolean;
  onToggleAddForm: () => void;
}

export function DashboardHeader({ showAddForm, onToggleAddForm }: DashboardHeaderProps) {
  const { user } = useAuthStore();

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Crypto Portfolio Tracker
        </h1>
        {user && <UserAvatar user={user} />}
      </div>
      <AddTradeButton 
        showAddForm={showAddForm} 
        onClick={onToggleAddForm} 
      />
    </div>
  );
}