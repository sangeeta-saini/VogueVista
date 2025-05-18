import React from "react";
import "./filter.css";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL;

import FilterContainer from "./FilterContainer";

function FilterSection({ fetchData }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log("----API_BASE_URL---", API_BASE_URL);
      const { data } = await axios.get(`${API_BASE_URL}/categories`);
      console.log("Fetched Categories:", data.items);
      if (data.items) {
        setCategories(
          data.items.map((item) => {
            return {
              ...item,
              isSelected: false,
            };
          })
        );
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/brands`);
      console.log("Fetched Brands:", data.items);
      // const brandNames = data.items.map((brand) => );
      setBrands(
        data.items.map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        })
      );
    } catch (err) {
      console.error("Error fetching brands", err);
    }
  };
  useEffect(() => {}, []);

  const handleCategoryToggle = async (e) => {
    const value = e.target.value;
    console.log(value);
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isSelected: category.value === value,
      }))
    );

    await fetchData({ category: value });
  };

  const [selectedPrices, setSelectedPrices] = useState([
    {
      label: "1000-3000",
      value: "1000-3000",
      isSelected: false,
    },
    {
      label: "3000-6000",
      value: "3000-6000",
      isSelected: false,
    },
    {
      label: "6000-9000",
      value: "6000-9000",
      isSelected: false,
    },
    {
      label: "10,000 and above",
      value: "10000-200000",
      isSelected: false,
    },
  ]);

  const handlePriceToggle = async (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectedPrices((prevPrices) =>
      prevPrices.map((price) => ({
        ...price,
        isSelected: price.value === value,
      }))
    );
    await fetchData({ price_range: value });
  };
  // await fetchData({ price_range: value });
  const handleBrandToggle = async (e) => {
    const value = e.target.value;

    console.log(value);
    setBrands((prevBrand) =>
      prevBrand.map((brand) => ({
        ...brand,
        isSelected: brand.value === value,
      }))
    );
    let brandName = value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    await fetchData({ brand: brandName });
  };

  const handleClearAll = async () => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isSelected: false,
      }))
    );

    setSelectedPrices((prevPrices) =>
      prevPrices.map((price) => ({
        ...price,
        isSelected: false,
      }))
    );

    setBrands((prevBrand) =>
      prevBrand.map((brand) => ({
        ...brand,
        isSelected: false,
      }))
    );

    await fetchData({});
  };

  return (
    <div className="filter-box">
      <div className="filter-container">
        <div className="heading">
          <h3>FILTERS</h3>
          <h3 className="clear-all" onClick={() => handleClearAll()}>
            CLEAR ALL
          </h3>
        </div>
        <FilterContainer
          title="Category"
          items={Array.isArray(categories) ? categories : []}
          handleToggle={handleCategoryToggle}
        />
        <FilterContainer
          title="Price"
          items={selectedPrices}
          handleToggle={handlePriceToggle}
        />
        <FilterContainer
          title="Brand"
          items={Array.isArray(brands) ? brands : []}
          handleToggle={handleBrandToggle}
        />
      </div>
    </div>
  );
}

export default FilterSection;
