"use client";

import React from "react";
import { useSelector } from "react-redux";

const PropertyDetails = ({ id }) => {
  
  const listingsData = useSelector((state) => state.listings?.listings);
  // Check for static or dynamic data
  const transformedListingsData =
    listingsData.find((elm) => elm._id === id) ||
    listingsData[0];
    

  const columns = [
    [
      // {
      //   label: "Property ID",
      //   value: "RT48",
      // },
      // {
      //   label: "Price",
      //   value: transformedListingsData?.price || "N/A",
      // },
      {
        label: "Property Size",
        value: `${transformedListingsData?.sqft || "N/A"} Sq Ft`,
      },
      {
        label: "Bathrooms",
        value: transformedListingsData?.bath || "N/A",
      },
      {
        label: "Bedrooms",
        value: transformedListingsData?.bed || "N/A",
      },
    ],
    [
      // {
      //   label: "Garage",
      //   value: "2",
      // },
      // {
      //   label: "Garage Size",
      //   value: "200 SqFt",
      // },
      {
        label: "Year Built",
        value: transformedListingsData?.yearBuilding || "N/A",
      },
      {
        label: "Property Type",
        value: transformedListingsData?.propertyType || "N/A",
      },
      {
        label: "Property Status",
        value: transformedListingsData?.status || "N/A",
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
            columnIndex === 1 ? " offset-xl-2" : ""
          }`}
        >
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
