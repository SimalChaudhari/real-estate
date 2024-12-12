'use client'

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const PropertyType = ({ filterFunctions }) => {
  const listingsData = useSelector((state) => state.listings?.listings);

  // const options = [

  //   { label: "Houses" },

  //   { label: "Apartments", defaultChecked: true },
  //   { label: "Office" },
  //   { label: "Villa" },

  // ];
  // Extract unique property types dynamically

  const options = useMemo(() => {
    if (!listingsData) return [];
    const propertyTypes = listingsData.map((item) => item.propertyType);
    return Array.from(new Set(propertyTypes)).map((type) => ({ label: type }));
  }, [listingsData]);

  return (
    <div>
      <label className="custom_checkbox"  >
        All
        <input type="checkbox"
          checked={!filterFunctions?.propertyTypes.length}
          onChange={(e => { filterFunctions?.setPropertyTypes([]) })}
        />
        <span className="checkmark" />
      </label>
      {options.map((option, index) => (
        <label className="custom_checkbox" key={index} >
          {option.label}
          <input type="checkbox"
            checked={filterFunctions?.propertyTypes.includes(option.label)}
            onChange={(e => { filterFunctions.handlepropertyTypes(option.label) })}
          />
          <span className="checkmark" />
        </label>
      ))}
    </div>
  );
};

export default PropertyType;
