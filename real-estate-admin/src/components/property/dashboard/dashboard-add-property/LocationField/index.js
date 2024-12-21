"use client";
import React, { useState, useEffect } from "react";
import Map from "./Map";

const locationOptions = {
  India: {
    states: ["Karnataka", "Maharashtra", "TamilNadu", "Delhi", "Gujarat"],
    cities: {
      Karnataka: ["Bangalore", "Mangalore", "Mysore"],
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
      Delhi: ["New Delhi", "Old Delhi"],
      Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    },
  },
  USA: {
    states: ["California", "Texas", "NewYork", "Florida"],
    cities: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      Texas: ["Houston", "Dallas", "Austin"],
      NewYork: ["New York City", "Buffalo", "Rochester"],
      Florida: ["Miami", "Orlando", "Tampa"],
    },
  },
};

const countryOptions = Object.keys(locationOptions).map((country) => ({
  value: country,
  label: country,
}));

const LocationField = ({ data = {}, onUpdate }) => {
  const [formData, setFormData] = useState({
    street_address: "",
    zip_code: "",
    lat: "",
    long: "",
    country: countryOptions[0], // Default to the first country
    state: "",
    city: "",
    ...data,
  });

  const states = locationOptions[formData.country?.value]?.states || [];
  const cities = locationOptions[formData.country?.value]?.cities[formData.state] || [];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...data, // Update local state when parent data changes
    }));
  }, [data]);

  const handleInputChange = (key, value) => {
    const updatedFormData = { ...formData, [key]: value };

    // Reset state and city if country changes
    if (key === "country") {
      updatedFormData.state = "";
      updatedFormData.city = "";
    }

    // Reset city if state changes
    if (key === "state") {
      updatedFormData.city = "";
    }

    setFormData(updatedFormData);
    onUpdate(updatedFormData); // Notify parent of changes
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">street_address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter street_address"
              value={formData.street_address}
              onChange={(e) => handleInputChange("street_address", e.target.value)}
            />
          </div>
        </div>


        <div className="col-sm-6 col-xl-3">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">State</label>
            <select
              className="form-control"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              disabled={!states.length}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">City</label>
            <select
              className="form-control"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              disabled={!cities.length}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">zip_code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter zip_code code"
              value={formData.zip_code}
              onChange={(e) => handleInputChange("zip_code", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Country</label>
          <select
            className="form-control"
            value={formData.country.value}
            onChange={(e) =>
              handleInputChange(
                "country",
                countryOptions.find((option) => option.value === e.target.value)
              )
            }
          >
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

        <div className="col-sm-12">
          <div className="mb20 mt30">
            <label className="heading-color ff-heading fw600 mb30">
              Place the listing pin on the map
            </label>
            <Map />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">lat</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter lat"
              value={formData.lat}
              onChange={(e) => handleInputChange("lat", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">long</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter long"
              value={formData.long}
              onChange={(e) => handleInputChange("long", e.target.value)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LocationField;
