'use client'

import { useEffect, useState } from 'react'

export function useKeyPress(targetKey: string) {
  const [keyPressed, setKeyPressed] = useState<boolean>(false)

  const downHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', downHandler)
    document.addEventListener('keyup', upHandler)

    return () => {
      document.removeEventListener('keydown', downHandler)
      document.removeEventListener('keyup', upHandler)
    }
  })

  return keyPressed
}
