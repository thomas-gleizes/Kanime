import React, { useEffect } from 'react';

type Effect = () => Promise<void>;

export default function useAsyncEffect(
  effect: Effect,
  dependencies: React.DependencyList
): void {
  useEffect(() => {
    (async () => {
      return await effect();
    })();
  }, [dependencies]);
}
