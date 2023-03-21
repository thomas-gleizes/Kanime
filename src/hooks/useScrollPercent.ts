'use client'

import { useEffect, useState } from 'react'
import isBrowser from '../utils/isBrowser'

interface Options {
  sensitive?: number
}

function getPercent(): number {
  if (isBrowser()) {
    const scrollTop = document.documentElement.scrollTop
    const documentHeight = document.documentElement.offsetHeight
    const windowHeight = window.innerHeight

    return (scrollTop / (documentHeight - windowHeight)) * 100
  } else return 0
}

export function useScrollPercent(options: Options = { sensitive: 5 }): number {
  const [percent, setPercent] = useState<number>(getPercent())

  useEffect(() => {
    if (isBrowser()) {
      const listener = () => {
        const percent = getPercent()

        if (options.sensitive && Math.abs(percent - getPercent()) > options.sensitive)
          setPercent(percent)
        else setPercent(percent)
      }

      document.addEventListener('scroll', listener)

      return () => document.removeEventListener('scroll', listener)
    }
  }, [])

  return percent
}
