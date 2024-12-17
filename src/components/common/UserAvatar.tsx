import React from 'react';
import type { User } from '../../types/auth';

interface UserAvatarProps {
  user: User;
}

export function UserAvatar({ user }: UserAvatarProps) {
  if (!user.photoURL) return null;
  
  return (
    <img
      src={user.photoURL}
      alt={user.displayName || 'User'}
      className="h-8 w-8 rounded-full"
    />
  );
}