import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useStateProps<T = unknown>(props: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(props)

  useEffect(() => setState(props), [props])

  return [state, setState]
}
