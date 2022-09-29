import { useEffect, useState } from 'react';

export function usePagination(max: number, initial?: number) {
  const [value, setValue] = useState(initial || 1);

  useEffect(() => setValue(Math.min(value, max)), [max]);

  const previous = () => setValue(Math.max(value - 1, 1));

  const next = () => setValue(Math.min(value + 1, max));

  const first = () => setValue(1);

  const last = () => setValue(max);

  const goTo = (value: number) => setValue(Math.min(Math.max(value, 1), max));

  return {
    value,
    actions: { previous, next, first, last, goTo },
  };
}
