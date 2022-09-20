import { useEffect } from 'react';
import { useLayoutContext } from 'context/layout.context';

export default function useHideHeader() {
  const { header } = useLayoutContext();

  useEffect(() => {
    header.hideHeader();

    return () => header.showHeader();
  }, []);
}
