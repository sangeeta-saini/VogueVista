import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://dummyjson.com/products");

      setData(response.data.products);
      console.log(response.data);
    }
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('https://dummyjson.com/products');
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const result = await response.json();
    //     setData(result);
    //   } catch (err) {
    //     setError(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchData();
  }, []);

  return (
    <>
      <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
      {/* <div className="parent">{show}</div>; */}
    </>
  );
};
