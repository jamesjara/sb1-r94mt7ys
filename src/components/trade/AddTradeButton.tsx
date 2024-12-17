import React from 'react';
import { Plus, X } from 'lucide-react';

interface AddTradeButtonProps {
  showAddForm: boolean;
  onClick: () => void;
}

export function AddTradeButton({ showAddForm, onClick }: AddTradeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {showAddForm ? (
        <>
          <X className="h-5 w-5 mr-2" />
          Cancel
        </>
      ) : (
        <>
          <Plus className="h-5 w-5 mr-2" />
          Add Trade
        </>
      )}
    </button>
  );
}