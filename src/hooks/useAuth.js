// src/hooks/useAuth.js
'use client';

import { useAuthContext } from '@/context/AuthContext';

export function useAuth() {
  return useAuthContext();
}