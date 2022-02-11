import React, { createContext, useState } from 'react';
import { useContextFactory, useScrollHeight, useScrollPercent } from '@hooks';

type Dialog<T = any> = {
  type: string;
  text: string;
  resolve: (params: T) => void;
};

export declare type LayoutContext = {
  activeTransparentState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dialogState: [Dialog, React.Dispatch<React.SetStateAction<Dialog>>];
  scrollPercent: number;
  scrollHeight: number;
  header: {
    hiddenHeader: boolean;
    hideHeader: () => void;
    showHeader: () => void;
  };
};

interface Props {
  children: React.ReactNode;
}

const LayoutContext = createContext<LayoutContext>(null);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useLayoutContext = useContextFactory<LayoutContext>(LayoutContext);

const LayoutContextProvider: React.FunctionComponent<Props> = ({ children }) => {
  const activeTransparentState = useState<boolean>(false);
  const dialogState = useState<Dialog>({ type: null, text: '', resolve: null });
  const [hiddenHeader, setHiddenHeader] = useState<boolean>(false);

  const scrollPercent = useScrollPercent();
  const scrollHeight = useScrollHeight();

  const hideHeader = () => setHiddenHeader(true);
  const showHeader = () => setHiddenHeader(true);

  return (
    <LayoutContext.Provider
      value={{
        activeTransparentState,
        dialogState,
        scrollPercent,
        scrollHeight,
        header: { hiddenHeader, hideHeader, showHeader },
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
