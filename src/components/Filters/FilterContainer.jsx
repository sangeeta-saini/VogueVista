import React, { useState } from "react";
import "./filter.css";

function FilterContainer({ title, items = [], handleToggle }) {
  return (
    <div className="main-box">
      <h3 className="box-1">{title}</h3>
      <div className="box-1-data">
        {items.map(({ value, label, isSelected }, index) => (
          <div key={value + `${index}`}>
            <input
              type="radio"
              id={value}
              name={title}
              value={value}
              checked={isSelected}
              onChange={handleToggle}
            />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterContainer;
