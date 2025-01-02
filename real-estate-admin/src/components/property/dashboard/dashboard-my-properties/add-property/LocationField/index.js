"use client";
import React, { useState, useEffect } from "react";
import Map from "./Map";
import { cityStateList } from "@/redux/actions/propertyActions";
import { useDispatch } from "react-redux";

const LocationField = ({ data = {}, onUpdate }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    street_address: "",
    zip_code: "",
    lat: "",
    long: "",
    country: "India",
    state: "",
    city: "",
    area: "",
    ...data,
  });

  const [states, setStates] = useState([]); // To store state data
  const [cities, setCities] = useState([]); // To store cities for the selected state
  const [areas, setAreas] = useState([]); // To store areas for the selected city

  // Fetch states and cities on component load
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const locationResponse = await dispatch(cityStateList());
        // Store the states from the API response
        setStates(locationResponse);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    };

    fetchLocationData();
  }, []);

  // Update cities when the selected state changes
  useEffect(() => {
    if (formData.state) {
      const selectedState = states.find((state) => state._id === formData.state);
      setCities(selectedState?.cities || []); // Update cities for the selected state
    } else {
      setCities([]);
    }
  }, [formData.state, states]);

  // Update areas when the selected city changes
  useEffect(() => {
    if (formData.city) {
      const selectedCity = cities.find((city) => city._id === formData.city);
      setAreas(selectedCity?.areas || []); // Update areas for the selected city
    } else {
      setAreas([]);
    }
  }, [formData.city, cities]);

  const handleInputChange = (key, value) => {
    const updatedFormData = { ...formData, [key]: value };

    // Reset city and area if state changes
    if (key === "state") {
      updatedFormData.city = "";
      updatedFormData.area = "";
    }

    // Reset area if city changes
    if (key === "city") {
      updatedFormData.area = "";
    }

    setFormData(updatedFormData);
    onUpdate(updatedFormData); // Notify parent of changes
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Street Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter street address"
              value={formData.street_address}
              onChange={(e) => handleInputChange("street_address", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Country</label>
            <select
              className="form-control"
              disabled // Lock the country field to India
            >
              <option value="India">India</option>
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">State</label>
            <select
              className="form-control"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-xl-2">
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
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-xl-2">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Area</label>
            <select
              className="form-control"
              value={formData.area}
              onChange={(e) => handleInputChange("area", e.target.value)}
              disabled={!areas.length}
            >
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-xl-2">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Zip Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter zip code"
              value={formData.zip_code}
              onChange={(e) => handleInputChange("zip_code", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20 mt30">
            <label className="heading-color ff-heading fw600 mb10">Place the Listing Pin on the Map</label>
            <Map lat={formData.lat} long={formData.long} onUpdate={handleInputChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-xl-6">
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">Latitude</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter latitude"
                value={formData.lat}
                onChange={(e) => handleInputChange("lat", e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6 col-xl-6">
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">Longitude</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter longitude"
                value={formData.long}
                onChange={(e) => handleInputChange("long", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LocationField;
