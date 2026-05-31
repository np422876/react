import { useState, useEffect } from "react";

function useFetch(url) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

  const fetchData = async () => {

    try {

      const res = await fetch(url);

      const result = await res.json();

      setData(result);

    } catch (err) {

      setError("Failed to load data");

    } finally {

      setLoading(false);

    }

  };

  fetchData();

}, [url]);

  return {
    data,
    loading,
    error,
    setData
  };

}

export default useFetch;