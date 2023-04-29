import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories,setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data.products);
          setCategories([
            ...new Set(response.data.products.map((item) => item.category)),
          ]);
          console.log("entered");
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.log("error here")
          setData([]);
          if (axios.isCancel(err)) {
            console.log("Request canceled:", err.message);
          } else {
            setFetchError(err.message);
          }
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

     fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);




  return { data, fetchError, isLoading ,categories};
};

export default useAxiosFetch;
