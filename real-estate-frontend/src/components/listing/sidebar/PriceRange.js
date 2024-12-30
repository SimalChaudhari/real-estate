"use client";

import React, { useState, useEffect } from "react";
import Slider from "rc-slider";

const PriceRange = ({ filterFunctions, filterData }) => {
  const [price, setPrice] = useState(filterData?.priceRange || [20, 70987]);

  useEffect(() => {
    if (filterFunctions?.priceRange) {
      setPrice(filterFunctions.priceRange);
    }
  }, [filterFunctions?.priceRange]);

  const handleOnChange = (value) => {
    setPrice(value);
    filterFunctions?.setPriceRange([value[0] || 0, value[1] || 100000]);
  };

  return (
    <div>
      <div className="range-wrapper">
        <Slider
          range
          max={100000}
          min={0}
          value={price}
          onChange={handleOnChange}
          id="slider"
        />
        <div className="d-flex align-items-center mt-2">
          <span id="slider-range-value1">₹{price[0]}</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">₹{price[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
