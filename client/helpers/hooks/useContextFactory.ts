import React, { useContext } from "react";

const useContextFactory = (context: React.Context<any>) => {
  return () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error(`use{name}Context must be used withing a {name}ContextProvider.`);
    }
    return ctx;
  };
};

export default useContextFactory;
