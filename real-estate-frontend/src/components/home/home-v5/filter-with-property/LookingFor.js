"use client";
import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

const LookingFor = ({ onPropertyTypeChange }) => {
  const listingsData = useSelector((state) => state.listings?.listings);

  // Ensure data is safely handled
  const uniquePropertyTypes =
    listingsData && listingsData.length
      ? [...new Set(listingsData.map((item) => item.propertyType))]
      : [];

  // Transform unique property types to catOptions format
  const inqueryType = uniquePropertyTypes.map((type) => ({
    value: type,
    label: type,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: "none",
    }),
    option: (styles, { isFocused, isSelected, isHovered }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered || isFocused
        ? "#eb675312"
        : undefined,
    }),
  };

  // Handle property type change
  const handleChange = (selectedOption) => {
    if (onPropertyTypeChange) {
      onPropertyTypeChange(selectedOption);
    }
  };

  return (
    <div>
      <Select
        options={inqueryType}
        styles={customStyles}
        className="text-start select-borderless"
        classNamePrefix="select"
        required
        isClearable
        placeholder="Property Type"
        onChange={handleChange}
      />
    </div>
  );
};

export default LookingFor;
