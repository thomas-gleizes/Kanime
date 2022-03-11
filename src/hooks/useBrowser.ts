import { useMemo } from 'react';

export default function useBrowser(): boolean {
  return useMemo(() => typeof window === 'object', []);
}
