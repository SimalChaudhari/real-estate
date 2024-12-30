"use client";
import React from "react";
import Select from "react-select";

const Area = ({ areas }) => {
  const areaOptions = areas?.map((area) => ({
    value: area,
    label: area,
  })) || [];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered || isFocused
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
      />
    </div>
  );
};

export default Area;
