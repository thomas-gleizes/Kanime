import React, { createContext, useEffect, useState } from "react";

import { useContextFactory } from "../helpers/hooks";
import { ContextProps } from "../helpers/interfaces/global";

interface LoaderContext {
  loading: boolean;
}

const LoaderContext = createContext<LoaderContext>({ loading: false });

export const useLoaderContext = useContextFactory(LoaderContext);

const LoaderContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loop = setInterval(() => {
      const load = localStorage.getItem("loader");
      if (load === "true") {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 20);

    return () => clearInterval(loop);
  }, []);

  return <LoaderContext.Provider value={{ loading }}>{children}</LoaderContext.Provider>;
};

export default LoaderContextProvider;
