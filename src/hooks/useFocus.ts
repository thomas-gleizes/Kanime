import { useEffect, useState } from 'react'

export function useFocus<T extends HTMLElement>(ref: MutableRefObject<T>): boolean {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('focus', handleFocus)
      ref.current.addEventListener('blur', handleBlur)

      return () => {
        ref.current?.removeEventListener('focus', handleFocus)
        ref.current?.removeEventListener('blur', handleBlur)
      }
    }
  }, [])

  return isFocused
}
