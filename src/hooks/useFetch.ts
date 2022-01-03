import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (
  fetch: (params: any) => Promise<any>,
  params: any = null,
  deps: Array<any> = [],
  errorCallBack: (error: any) => any = null,
  condition: boolean = true
): [state: any, loading: boolean, crash: any] => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [crash, setCrash] = useState<any>(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      if (condition) {
        setLoading(true);
        try {
          const { data } = await fetch(params);
          setData(data);
        } catch (error) {
          if (errorCallBack) setCrash(errorCallBack(error));
          else setCrash(true);
        }
        setLoading(false);
      }
    })();

    return () => source.cancel();
  }, [...deps]);

  return [data, loading, crash];
};

export default useFetch;
