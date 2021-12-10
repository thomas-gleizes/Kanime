import { useCallback, useState } from 'react';

const useCallBackRef = <T>(): [state: T | null, ref: any] => {
  const [state, setState] = useState<T | null>(null);

  const ref = useCallback<any>(
    (node: any) => {
      if (node) setState(node);
    },
    [state]
  );

  return [state, ref];
};

export default useCallBackRef;
