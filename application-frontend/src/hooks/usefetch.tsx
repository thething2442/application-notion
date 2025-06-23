import { useEffect, useState } from "react";
import axios from "axios";
export function useFetch<TData>(url: string) {
  const [data, setData] = useState<TData | null>(null); // Use TData here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Better type for error
  const [refetchTrigger, setRefetchTrigger] = useState(0); // Use a trigger for refetch
  const [user, setUser] = useState<any | null>(null); // Type this more specifically if possible

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const res = await axios.get(url);
        setData(res.data);
        setUser(res.data); // Assuming user data is part of the main response
      } catch (err: any) { // Type 'err' as 'any' or 'AxiosError'
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refetchTrigger]); // Depend on url and the trigger

  // Function to manually trigger a refetch
  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { error,data,loading, refetch, user };
}