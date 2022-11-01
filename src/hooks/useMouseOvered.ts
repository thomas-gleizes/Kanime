import { useEffect, useState } from 'react'

export function useMouseOvered<T extends HTMLElement>(ref: MutableRefObject<T>): boolean {
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
  }, [isMouseOver])

  return isMouseOver
}
