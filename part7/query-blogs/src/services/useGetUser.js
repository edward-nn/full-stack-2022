import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import login from "../services/login";

export const useGetUser = (username, password) => {
  console.log('username', username, 'password', password)
  const [data, setData] = useState({});
  const { isLoading, error, data: queryData } = useQuery(
    [username],
    async () => {
      try {
        const response = await login(username, password);
        const parsedResponse = await response.json();
        setData(parsedResponse);
      } catch (error) {
        throw error;
      }
    },
    {
      enabled: !!username,
      initialData: {},
    }
  );

  useEffect(() => {
    if (queryData?.user) {
      setData(queryData);
    } else if (error) {
      throw error;
    }
  }, [queryData, error]);

  return { data, isLoading };
};