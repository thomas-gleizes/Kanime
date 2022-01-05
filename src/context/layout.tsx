import React, { createContext, useState } from 'react';
import { useContextFactory, useScrollPercent } from '@hooks';

export declare type LayoutContext = {
  headerTransparentState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  scrollPercent: number;
};

interface Props {
  children: React.ReactNode;
}

const LayoutContext = createContext<LayoutContext>(null);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useLayoutContext = useContextFactory<LayoutContext>(LayoutContext);

const LayoutContextProvider: React.FunctionComponent<Props> = ({ children }) => {
  const headerTransparentState = useState<boolean>(false);
  const scrollPercent = useScrollPercent();

  return (
    <LayoutContext.Provider value={{ headerTransparentState, scrollPercent }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
