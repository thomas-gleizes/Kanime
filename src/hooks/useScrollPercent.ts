import { useEffect, useState } from 'react';

function getPercent(): number {
  if (process.browser) {
    const scrollTop = document.documentElement.scrollTop;
    const documentHeight = document.documentElement.offsetHeight;
    const windowHeight = window.innerHeight;

    return (scrollTop / (documentHeight - windowHeight)) * 100;
  } else return 0;
}

export default function useScrollPercent(): number {
  const [percent, setPercent] = useState<number>(getPercent());

  useEffect(() => {
    if (process.browser) {
      const listener = () => setPercent(getPercent());

      document.addEventListener('scroll', listener);

      return () => document.removeEventListener('scroll', listener);
    }
  }, []);

  return percent;
}
