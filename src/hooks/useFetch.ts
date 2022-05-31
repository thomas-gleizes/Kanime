import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch<Data>(
  fetch: (params: any) => Promise<Data>,
  params: any = null,
  deps: Array<any> = [],
  errorCallBack: (error: any) => any = null,
  condition: boolean = true
): [state: Data, loading: boolean, error: any] {
  // @ts-ignore
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    setLoading(true);

    if (condition)
      fetch(params)
        .then((data) => setData(data))
        .catch((err) => {
          if (errorCallBack) setError(errorCallBack(err));
          else setError(err);
        })
        .finally(() => setLoading(false));

    return () => source.cancel();
  }, [...deps]);

  return [data, loading, error];
}
