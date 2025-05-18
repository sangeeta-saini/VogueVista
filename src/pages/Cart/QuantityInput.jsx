import "./Cart.css";
import React, { useEffect, useState } from "react";

const QuantityInput = ({ quantity, onChange }) => {
  const [localQty, setLocalQty] = useState(quantity);

  useEffect(() => {
    setLocalQty(quantity);
  }, [quantity]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value) && value > 0) {
      setLocalQty(value);
      onChange(value);
    } else if (e.target.value === "") {
      setLocalQty("");
    }
  };

  const handleBlur = () => {
    if (localQty === "" || localQty < 1) {
      setLocalQty(1);
      onChange(1);
    }
  };

  const increase = () => {
    const newQty = localQty + 1;
    setLocalQty(newQty);
    onChange(newQty);
  };

  const decrease = () => {
    const newQty = localQty > 0 ? localQty - 1 : 0;
    setLocalQty(newQty);
    onChange(newQty);
  };

  return (
    <div className="quentity-btn">
      <button onClick={decrease} className="cart-minus">
        −
      </button>
      <input
        type="number"
        value={localQty}
        onChange={handleChange}
        onBlur={handleBlur}
        className="quantity-input"
        min="0"
      />
      <button onClick={increase} className="cart-plus">
        +
      </button>
    </div>
  );
};

export default QuantityInput;
