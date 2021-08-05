import { useEffect } from "react";

const useLog = (libelle: string, ...params: any) => {
  useEffect(() => console.log(libelle, params), [...params]);
};

export default useLog;
