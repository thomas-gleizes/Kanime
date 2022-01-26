import React, { useEffect } from 'react';

type Effect = () => Promise<void>;

const useAsyncEffect = (effect: Effect, dependencies: React.DependencyList) => {
  useEffect(() => {
    (async () => {
      return await effect();
    })();
  }, [dependencies]);
};

export default useAsyncEffect;
