import React, { useState, useEffect, useRef } from 'react'

export function useHovered<T extends HTMLElement>(
  initialValue: boolean = false
): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)

  const [isHover, setIsHover] = useState<boolean>(initialValue)

  useEffect(() => {
    const handleMouseOver = () => setIsHover(true)
    const handleMouseOut = () => setIsHover(false)

    if (ref.current) {
      ref.current.addEventListener('mouseover', handleMouseOver)
      ref.current.addEventListener('mouseout', handleMouseOut)

      return () => {
        ref.current?.removeEventListener('mouseover', handleMouseOver)
        ref.current?.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [])

  return [ref, isHover]
}
