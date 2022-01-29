import { useEffect, useState } from 'react';

function getHeight(): number {
  if (process.browser) return document.documentElement.scrollTop;
  else return 0;
}

export default function useScrollHeight(): number {
  const [height, setHeight] = useState<number>(getHeight());

  useEffect(() => {
    if (process.browser) {
      const listener = () => {
        setHeight(getHeight());
      };

      document.addEventListener('scroll', listener);

      return () => document.removeEventListener('scroll', listener);
    }
  }, [process.browser]);

  return height;
}
