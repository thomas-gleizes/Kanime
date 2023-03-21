'use client'

import { useEffect, useRef, useState } from 'react'

export function useMouseOver<T extends HTMLElement>(
  initialRef?: MutableRefObject<T>
): [boolean, MutableRefObject<T>] {
  const ref = useRef<Nullable<T>>(initialRef?.current || null)

  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseOver = () => setIsMouseOver(true)
    const handleMouseOut = () => setIsMouseOver(false)

    if (ref.current) {
      ref.current.addEventListener('mouseover', handleMouseOver)
      ref.current.addEventListener('mouseout', handleMouseOut)

      return () => {
        ref.current?.removeEventListener('mouseover', handleMouseOver)
        ref.current?.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [])

  return [isMouseOver, ref]
}
