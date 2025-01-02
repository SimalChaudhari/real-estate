"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const PropertyType = ({ filterFunctions, filterData }) => {
  const listingsData = useSelector((state) => state.listings?.listings);

  const options = useMemo(() => {
    if (!listingsData) return [];
    const propertyTypes = listingsData.map((item) => item.propertyType);
    return Array.from(new Set(propertyTypes)).map((type) => ({ label: type }));
  }, [listingsData]);

  return (
    <div>
      <label className="custom_checkbox">
        All
        <input
          type="checkbox"
          checked={!filterData?.propertyTypes?.length}
          onChange={() => filterFunctions?.setPropertyTypes([])}
        />
        <span className="checkmark" />
      </label>
      {options.map((option, index) => (
        <label className="custom_checkbox" key={index}>
          {option.label}
          <input
            type="checkbox"
            checked={filterData?.propertyTypes?.includes(option.label)}
            onChange={() =>
              filterFunctions.setPropertyTypes(option.label)
            }
          />
          <span className="checkmark" />
        </label>
      ))}
    </div>
  );
};

export default PropertyType;
