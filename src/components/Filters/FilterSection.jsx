import React from "react";
import "./filter.css";
import { useState } from "react";

import FilterContainer from "./FilterContainer";

function FilterSection({ fetchData }) {
  const products = [{}];

  const filter = [
    {
      id: "category",
      name: "Category",
      options: [
        { value: "women", label: "Women" },
        { value: "men", label: "Men" },
        { value: "kids", label: "Kids" },
        { value: "beauty", label: "Beauty" },
      ],
    },

    {
      id: "price",
      name: "Price",
      options: [
        { value: "200-400", label: "200-400" },
        { value: "400-600", label: "400-600" },
        { value: "600-800", label: "600-800" },
        { value: "800-1000", label: "800-1000" },
      ],
    },

    {
      id: "color",
      name: "Color",
      options: [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "pink", label: "Pink" },
        { value: "green", label: "Green" },
        { value: "black", label: "Black" },
        { value: "white", label: "White" },
        { value: "gold", label: "Gold" },
        { value: "grey", label: "Grey" },
      ],
    },

    {
      id: "discount",
      name: "Discounts",
      options: [
        { value: "20% and above", label: "20% and above" },
        { value: "30% and above", label: "30% and above" },
        { value: "40% and above", label: "40% and above" },
        { value: "50% and above", label: "50% and above" },
        { value: "60% and above", label: "60% and above" },
        { value: "70% and above", label: "70% and above" },
      ],
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState([
    {
      display: "Women",
      value: "women",
      isSelected: false,
    },
    {
      display: "Men",
      value: "men",
      isSelected: false,
    },
    {
      display: "Kids",
      value: "kids",
      isSelected: false,
    },
    {
      display: "Beauty",
      value: "beauty",
      isSelected: false,
    },
  ]);
  const categories = ["Women", "Men", "Kids", "Beauty"];

  const handleCategoryToggle = async (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectedCategories((prevCategories) =>
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

  const [selectedBrand, setSelectedBrand] = useState([
    {
      display: "Red",
      value: "red",
      isSelected: false,
    },
    {
      display: "Blue",
      value: "blue",
      isSelected: false,
    },
    {
      display: "Pink",
      value: "pink",
      isSelected: false,
    },
    {
      display: "Green",
      value: "green",
      isSelected: false,
    },
    {
      display: "Black",
      value: "black",
      isSelected: false,
    },
    {
      display: "White",
      value: "white",
      isSelected: false,
    },
    {
      display: "Gold",
      value: "gold",
      isSelected: false,
    },
    {
      display: "Gray",
      value: "gray",
      isSelected: false,
    },
  ]);

  const colors = [
    "Red",
    "Blue",
    "Pink",
    "Green",
    "Black",
    "White",
    "Gold",
    "Grey",
  ];

  const handleBrandToggle = (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectedBrand((prevBrand) =>
      prevBrand.map((brand) => ({
        ...brand,
        isSelected: brand.value === value,
      }))
    );
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
          items={selectedCategories}
          handleToggle={handleCategoryToggle}
        />
        <FilterContainer
          title="Price"
          items={selectedPrices}
          handleToggle={handlePriceToggle}
        />
        <FilterContainer
          title="Brand"
          items={selectedBrand}
          handleToggle={handleBrandToggle}
        />
      </div>
    </div>
  );
}

export default FilterSection;
