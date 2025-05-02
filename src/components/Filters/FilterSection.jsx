import React from "react";
import "./filter.css";
import { useState, useEffect } from "react";
import axios from "axios";

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
      const { data } = await axios.get("http://localhost:8080/categories");
      console.log("Fetched Categories:", data.items);
      setCategories(
        data.items.map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        })
      );
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/brands");
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
  // {
  //   id: "price",
  //   name: "Price",
  //   options: [
  //     { value: "200-400", label: "200-400" },
  //     { value: "400-600", label: "400-600" },
  //     { value: "600-800", label: "600-800" },
  //     { value: "800-1000", label: "800-1000" },
  //   ],
  // },

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
      display: "200-400",
      value: "200-400",
      isSelected: false,
    },
    {
      display: "400-600",
      value: "400-600",
      isSelected: false,
    },
    {
      display: "600-800",
      value: "600-800",
      isSelected: false,
    },
    {
      display: "800-1000",
      value: "800-1000",
      isSelected: false,
    },
  ]);

  const price = [
    { id: "p2", label: "200-400", value: "200-400" },
    { id: "p4", label: "400-600", value: "400-600" },
    { id: "p6", label: "600-800", value: "600-800" },
    { id: "p8", label: "800-1000", value: "800-1000" },
  ];

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

  return (
    <div>
      <div className="filter-container">
        <div className="heading">
          <h3>FILTERS</h3>
          <h3>CLEAR ALL</h3>
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
