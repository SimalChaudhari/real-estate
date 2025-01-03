"use client";
import React from "react";
import Select from "react-select";

const Area = ({ areas = [], onAreaChange }) => {
  // Transform areas into options for the select dropdown
  const areaOptions =
    areas.map((area) => ({
      id: area._id, // Include `_id` for uniqueness
      value: area.name,
      label: area.name,
    })) || [];

  const customStyles = {
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isFocused
        ? "#eb675312"
        : undefined,
    }),
  };

  return (
    <div>
      <Select
        options={areaOptions}
        styles={customStyles}
        className="text-start select-borderless"
        classNamePrefix="select"
        placeholder="Select Area"
        isClearable
        onChange={onAreaChange} // Pass the selected area to the parent
      />
    </div>
  );
};

export default Area;
