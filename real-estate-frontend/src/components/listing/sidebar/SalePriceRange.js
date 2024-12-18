"use client";
import React, { useState } from "react";
import Slider, { Range } from "rc-slider";

const SalePriceRange = ({ filterFunctions }) => {
  const [price, setPrice] = useState([20, 70987]);

  // price range handler

  // price range handler
  const handleOnChange = (value) => {
    setPrice(value);

    filterFunctions?.handleSalepriceRange([value[0] || 0, value[1]]);
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          formatLabel={() => ``}
          max={100000}
          min={0}
          defaultValue={[
            filterFunctions?.salePriceRange[0],
            filterFunctions?.salePriceRange[1],
          ]}
          onChange={(value) => handleOnChange(value)}
          id="slider"
        />
        <div className="d-flex align-items-center">
          <span id="slider-range-value1">₹{price[0]}</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">₹{price[1]}</span>
        </div>
      </div>
    </>
  );
};

export default SalePriceRange;
