import { useEffect, useState } from 'react';
import isBrowser from '@helpers/isBrowser';

function getPercent(): number {
  if (isBrowser()) {
    const scrollTop = document.documentElement.scrollTop;
    const documentHeight = document.documentElement.offsetHeight;
    const windowHeight = window.innerHeight;

    return (scrollTop / (documentHeight - windowHeight)) * 100;
  } else return 0;
}

export default function useScrollPercent(): number {
  const [percent, setPercent] = useState<number>(getPercent());

  useEffect(() => {
    if (isBrowser()) {
      const listener = () => setPercent(getPercent());

      document.addEventListener('scroll', listener);

      return () => document.removeEventListener('scroll', listener);
    }
  }, []);

  return percent;
}
