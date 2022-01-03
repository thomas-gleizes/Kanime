import React, { useContext } from 'react';

const useContextFactory = <T = any>(context: React.Context<T>) => {
  return () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ctx = useContext<T>(context);

    if (ctx === undefined)
      throw new Error(`use{name}Context must be used withing a {name}ContextProvider.`);

    return ctx;
  };
};

export default useContextFactory;
