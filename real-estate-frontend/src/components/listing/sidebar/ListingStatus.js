"use client";

import React, { useEffect, useState } from "react";

const ListingStatus = ({ filterFunctions, filterData }) => {
  const options = [
    { id: "all", label: "All" },
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "sold", label: "Sold" },
  ];

  // Ensure the selected status is updated correctly
  const [selectedStatus, setSelectedStatus] = useState(filterData?.listingStatus || "all");

  // Update local state when filterFunctions.listingStatus changes
  useEffect(() => {
    if (filterData?.listingStatus) {
      setSelectedStatus(filterData.listingStatus);
    }
  }, [filterData?.listingStatus]);

  const handleChange = (id) => {
    setSelectedStatus(id);
    filterFunctions?.setListingStatus(id);
  };

  return (
    <>
      {options.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            id={option.id}
            checked={selectedStatus === option.id}
            onChange={() => handleChange(option.id)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
