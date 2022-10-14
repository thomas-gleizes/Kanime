import React, { createContext, useCallback, useEffect, useState } from 'react';

import { useContextFactory, useScrollHeight, useScrollPercent } from 'hooks';
import { MINUTE, SECOND } from 'resources/constants';
import LocalStorageService from 'services/localStorage.service';
import isBrowser from 'utils/isBrowser';

const LayoutContext = createContext<LayoutContextValues>({} as any);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useLayoutContext = useContextFactory<LayoutContextValues>(LayoutContext);

const LayoutContextProvider: Component<ContextProviderProps> = ({ children }) => {
  const activeTransparentState = useState<boolean>(false);
  const [hiddenHeader, setHiddenHeader] = useState<boolean>(false);
  const [theme, setTheme] = useState<TailwindTheme>(LocalStorageService.getTheme());

  const [lastEventTime, setLastEventTime] = useState<number>(Date.now());
  const [isInactive, setIsInactive] = useState<boolean>(false);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiLoadingPercent, setApiLoadingPercent] = useState<number>(0);

  const scrollPercent = useScrollPercent();
  const scrollHeight = useScrollHeight();

  const hideHeader = () => setHiddenHeader(true);
  const showHeader = () => setHiddenHeader(true);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    LocalStorageService.setTheme(newTheme);
  };

  const activityListener = useCallback(() => {
    const now = Date.now();

    if (now - lastEventTime > SECOND * 20) {
      setLastEventTime(now);
    }

    isInactive && setIsInactive(false);
  }, [lastEventTime]);

  useEffect(() => {
    document.body.addEventListener('mousemove', activityListener);
    document.body.addEventListener('keydown', activityListener);

    return () => {
      document.body.removeEventListener('mousemove', activityListener);
      document.body.removeEventListener('keydown', activityListener);
    };
  }, [activityListener]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastEventTime > MINUTE * 5) {
        !isInactive && setIsInactive(true);
      } else {
        isInactive && setIsInactive(false);
      }
    }, MINUTE);

    return () => clearInterval(interval);
  }, [lastEventTime]);

  useEffect(() => {
    if (theme === 'dark')
      !document.documentElement.classList.contains('dark') &&
        document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const message = event.data;
      console.log('Message', message);

      if (message === 'api-call-started') !apiLoading && setApiLoading(true);
      else if (message === 'api-call-finished') apiLoading && setApiLoading(false);
    };

    if (isBrowser()) {
      window.addEventListener('message', listener);

      return () => window.removeEventListener('message', listener);
    }
  }, [apiLoading]);

  useEffect(() => {
    if (isBrowser()) {
    }
  }, [apiLoading]);

  return (
    <LayoutContext.Provider
      value={{
        activeTransparentState,
        scrollPercent,
        scrollHeight,
        theme,
        toggleTheme,
        header: { hiddenHeader, hideHeader, showHeader },
        isInactive,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
