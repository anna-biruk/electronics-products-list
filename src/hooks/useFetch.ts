import { useEffect, useState } from 'react';

export type Character = {
  id: number;
  gender: string;
  image: string;
  name: string;
  species: string;
  status: string;
};

type Response = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
  error?: string;
};

type Result = {
  characters?: Response;
  loading: boolean;
  error: boolean;
  setFetchParams: (params: FetchParams) => void;
};
type FetchParams = {
  [key: string]: string | number;
};

const objectToQueryUri = (params: object): string => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return queryParams;
};

const useFetch = (url: string, initialParams: FetchParams = {}): Result => {
  const [characters, setCharacters] = useState<Response>();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<FetchParams>(initialParams);
  const [error, setError] = useState(false);
  const setFetchParams = (newParams: FetchParams) => {
    setParams({ ...params, ...newParams });
  };
  useEffect(() => {
    const api = async () => {
      setLoading(true);
      const queryParams = objectToQueryUri(params);
      const response = await fetch(`${url}?${queryParams}`);
      const data = await response.json();
      setCharacters(data);
      setLoading(false);
      if (!response.ok) {
        setError(true);
      }
    };
    api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, params]);

  return { characters, loading, error, setFetchParams };
};

export default useFetch;
