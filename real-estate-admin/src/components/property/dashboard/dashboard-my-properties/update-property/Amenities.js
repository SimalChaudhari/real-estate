"use client";
import React, { useState, useEffect } from "react";

const amenitiesData = {
  column1: [
    { label: "Attic", defaultChecked: false },
    { label: "Basketball court", defaultChecked: false },
    { label: "Air Conditioning", defaultChecked: false },
    { label: "Lawn", defaultChecked: false },
    { label: "Swimming Pool", defaultChecked: false },
    { label: "Barbeque", defaultChecked: false },
    { label: "Microwave", defaultChecked: false },
  ],
  column2: [
    { label: "TV Cable", defaultChecked: false },
    { label: "Dryer", defaultChecked: false },
    { label: "Outdoor Shower", defaultChecked: false },
    { label: "Washer", defaultChecked: false },
    { label: "Gym", defaultChecked: false },
    { label: "Ocean view", defaultChecked: false },
    { label: "Private space", defaultChecked: false },
  ],
  column3: [
    { label: "Lake view", defaultChecked: false },
    { label: "Wine cellar", defaultChecked: false },
    { label: "Front yard", defaultChecked: false },
    { label: "Refrigerator", defaultChecked: false },
    { label: "WiFi", defaultChecked: false },
    { label: "Laundry", defaultChecked: false },
    { label: "Sauna", defaultChecked: false },
  ],
};

const Amenities = ({ data = [], onUpdate }) => {
  const [selectedAmenities, setSelectedAmenities] = useState({});

  useEffect(() => {
    // Initialize selectedAmenities from parent-provided data or defaults
    const initialAmenities = {};
    Object.keys(amenitiesData).forEach((columnKey) => {
      amenitiesData[columnKey].forEach((amenity) => {
        initialAmenities[amenity.label] =
          data.includes(amenity.label) || amenity.defaultChecked;
      });
    });
    setSelectedAmenities(initialAmenities);
  }, [data]);

  const handleCheckboxChange = (label) => {
    const updatedAmenities = {
      ...selectedAmenities,
      [label]: !selectedAmenities[label],
    };
    setSelectedAmenities(updatedAmenities);
    // Notify parent of the selected amenities
    onUpdate(Object.keys(updatedAmenities).filter((key) => updatedAmenities[key]));
  };

  return (
    <div className="row">
      {Object.keys(amenitiesData).map((columnKey, index) => (
        <div key={index} className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            {amenitiesData[columnKey].map((amenity, amenityIndex) => (
              <label key={amenityIndex} className="custom_checkbox">
                {amenity.label}
                <input
                  type="checkbox"
                  checked={!!selectedAmenities[amenity.label]}
                  onChange={() => handleCheckboxChange(amenity.label)}
                />
                <span className="checkmark" />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
