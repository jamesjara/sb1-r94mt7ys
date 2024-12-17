import React from 'react';
import { AuthProvider } from './components/auth/AuthProvider';
import { MainLayout } from './layouts/MainLayout';

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}