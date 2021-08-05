import React, { useCallback, useState } from "react";

const useCallBackRef = (): [state: HTMLElement, ref: React.Ref<any>] => {
  const [state, setState] = useState<HTMLElement>(null);

  const ref = useCallback<any>(
    (node) => {
      if (node) {
        setState(node);
      }
    },
    [state]
  );

  return [state, ref];
};

export default useCallBackRef;
