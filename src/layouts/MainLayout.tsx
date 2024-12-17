import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { AuthModal } from '../components/auth/AuthModal';
import { Dashboard } from '../components/dashboard/Dashboard';

export function MainLayout() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {!user ? <AuthModal /> : <Dashboard />}
    </div>
  );
}