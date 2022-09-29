import { useState } from 'react';

export function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = (): void => setState(!state);

  return [state, toggle];
}
