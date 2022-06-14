import { useState } from 'react';

export default function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = (): void => setState(!state);

  return [state, toggle];
}
