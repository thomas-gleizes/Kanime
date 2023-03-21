'use client'

import { useEffect, useState } from 'react'

export function useFocus<T extends HTMLElement>(ref: MutableRefObject<T>): boolean {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('focusin', handleFocus)
      ref.current.addEventListener('focusout', handleBlur)

      return () => {
        ref.current?.removeEventListener('focusin', handleFocus)
        ref.current?.removeEventListener('focusout', handleBlur)
      }
    }
  }, [isFocused])

  return isFocused
}
