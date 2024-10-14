import { useState, useCallback} from 'react';

const useFetch = (handleUnauthorized) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (url, options) => {
    setLoading(true);
    try {

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: "include",
      });

      if(response.status === 401 || response.status === 403){
        console.log("NO SE AUTORIZO")
        handleUnauthorized();
        throw new Error('Unauthorized');
      }

      const contentType = response.headers.get('Content-Type');
      let result;
      if  (contentType && contentType.includes('application/json')){
         result = await response.json();
      } else {
        result = await response.text();
      }

      setData(result);
      setError(null);
      setLoading(false);
      return { data: result, error: null };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log
      return { data: null, error: err.message };
    }
  }, []);

  return { data, error, loading, fetchData };
};

export default useFetch;
