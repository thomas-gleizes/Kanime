import { useCallback, useState } from 'react';

const useToggle = (initialValues: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialValues);
  const toggle = useCallback((): void => setState(!state), [state]);

  return [state, toggle];
};

export default useToggle;
