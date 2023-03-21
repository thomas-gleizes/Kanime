'use client'

import { useMemo } from 'react'

export function useBrowser(): boolean {
  return useMemo(() => typeof window === 'object', [])
}
