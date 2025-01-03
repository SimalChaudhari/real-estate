"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchData } from "./fetch-data";

const PropertyFeaturesAminites = ({ id }) => {

  const { fetchByData } = useFetchData()
  
  const transformedListingsData = useSelector((state) => state.property?.propertyByID || []);

  useEffect(() => {
      fetchByData(id)
  }, [])

  if (!transformedListingsData) {
    return <div>No property found.</div>; // Handle case where no property matches
  }
  
  // Get features from transformedListingsData
  const features = transformedListingsData.features || [];

  // Chunk the features array into groups of 4 for a responsive layout
  const chunkedFeatures = [];
  for (let i = 0; i < features.length; i += 4) {
    chunkedFeatures.push(features.slice(i, i + 4));
  }

  // const featuresAmenitiesData = [
  //   ["Air Conditioning", "Barbeque", "Dryer", "Gym"],
  //   ["Lawn", "Microwave", "Outdoor Shower", "Refrigerator"],
  //   ["Swimming Pool", "TV Cable", "Washer", "WiFi6"],
  // ];

  return (
    <>
      {chunkedFeatures.map((row, rowIndex) => (
        <div key={rowIndex} className="col-sm-6 col-md-4">
          <div className="pd-list">
            {row.map((item, index) => (
              <p key={index} className="text mb10">
                <i className="fas fa-circle fz6 align-middle pe-2" />
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PropertyFeaturesAminites;
