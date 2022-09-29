import { useEffect, useState } from 'react';
import isBrowser from '../utils/isBrowser';

function getHeight(): number {
  if (isBrowser()) return document.documentElement.scrollTop;
  else return 0;
}

export function useScrollHeight(): number {
  const [height, setHeight] = useState<number>(getHeight());

  useEffect(() => {
    if (isBrowser()) {
      const listener = () => setHeight(getHeight());

      document.addEventListener('scroll', listener);

      return () => document.removeEventListener('scroll', listener);
    }
  }, []);

  return height;
}
