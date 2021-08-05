import { useEffect, useState } from "react";

const useSearch = (fetch, query, minLength = 3, errorCb = null) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (query.length >= minLength) {
        setLoading(true);
        try {
          const { data } = await fetch(query);
          setState(data);
        } catch (error) {
          errorCb && errorCb(error);
        }
        setLoading(false);
      }
    })();
  }, [query]);

  return [state, loading, setState];
};

export default useSearch;
