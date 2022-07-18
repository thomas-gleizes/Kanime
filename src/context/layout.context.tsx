import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useConst } from '@chakra-ui/react';

import { useContextFactory, useScrollHeight, useScrollPercent } from 'hooks';
import { MINUTE, SECOND } from 'resources/constants';

type Dialog<Params = any, Content = any> = {
  type: string;
  content: Content;
  resolve: (params: Params) => void;
};

export declare type LayoutContext = {
  activeTransparentState: State<boolean>;
  dialogState: State<Dialog>;
  scrollPercent: number;
  scrollHeight: number;
  header: {
    hiddenHeader: boolean;
    hideHeader: () => void;
    showHeader: () => void;
  };
  isInactive: boolean;
  environment: Environment;
};

interface Props {
  children: NodeR;
}

const LayoutContext = createContext<LayoutContext>({} as any);

export const useLayoutContext = useContextFactory<LayoutContext>(LayoutContext);

const LayoutContextProvider: React.FunctionComponent<Props> = ({ children }) => {
  const activeTransparentState = useState<boolean>(false);
  const dialogState = useState<Dialog>({ type: null, content: null, resolve: null });
  const [hiddenHeader, setHiddenHeader] = useState<boolean>(false);

  const [lastEventTime, setLastEventTime] = useState<number>(Date.now());
  const [isInactive, setIsInactive] = useState<boolean>(false);

  const scrollPercent = useScrollPercent();
  const scrollHeight = useScrollHeight();

  const hideHeader = () => setHiddenHeader(true);
  const showHeader = () => setHiddenHeader(true);

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

  const environment = useConst<Environment>({
    isDevelopment: process.env.NEXT_PUBLIC_ENV === 'development',
    appName: process.env.NEXT_PUBLIC_APP_NAME as string,
  });

  return (
    <LayoutContext.Provider
      value={{
        activeTransparentState,
        dialogState,
        scrollPercent,
        scrollHeight,
        header: { hiddenHeader, hideHeader, showHeader },
        isInactive,
        environment,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
