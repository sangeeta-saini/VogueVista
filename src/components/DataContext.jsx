import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  async function fetchData(query = {}) {
    const { category, price_range, brand } = query;
    let queryString = "";
    if (category) {
      queryString = `category=${category}&`;
    }
    if (price_range) {
      queryString = `price_range=${price_range}&`;
    }
    if (brand) {
      queryString = `brand=${brand}`;
    }
    const response = await axios.get(`${API_BASE_URL}/products?${queryString}`);

    setData(response.data.items);
    console.log(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DataContext.Provider value={{ data, fetchData }}>
        {children}
      </DataContext.Provider>
    </>
  );
};
