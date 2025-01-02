"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import {
  fetchLocationFailure,
  fetchLocationsStart,
  fetchLocationsSuccess,
} from "@/app/features/locationsSlice";
import { GetLocationList } from "@/services/listing/locationApi";

const Location = ({ filterFunctions, filterData }) => {
  const dispatch = useDispatch();
  const { location, loading } = useSelector((state) => state.location);

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      dispatch(fetchLocationsStart());
      try {
        const response = await GetLocationList();
        if (response.success && response.data.length) {
          dispatch(fetchLocationsSuccess(response.data));
        } else {
          dispatch(fetchLocationFailure("Failed to fetch locations."));
        }
      } catch (error) {
        dispatch(fetchLocationFailure(error.message || "An error occurred."));
      }
    };

    fetchLocations();
  }, [dispatch]);

  // Generate location options dynamically from fetched data
  const locationOptions = [
    { value: "All Cities", label: "All Cities" }, // Default option
    ...(location?.[0]?.cities
      ? Array.from(new Set(location[0].cities.map((item) => item.name))).map((name) => ({
        value: name,
        label: name,
      }))
      : []),
  ];

  // Custom styles for the select dropdown
  const customStyles = {
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isFocused
          ? "#eb675312"
          : undefined,
      color: isSelected ? "#fff" : "#000",
    }),
  };

  // Handle location selection changes
  const handleChange = (selectedOption) => {
    filterFunctions?.setLocation(selectedOption.value);
  };

  return (
    <>
      {loading ? (
        <p>Loading locations...</p>
      ) : (
        <Select
          defaultValue={
            filterFunctions.location
              ? { value: filterFunctions.location, label: filterFunctions.location }
              : locationOptions[0]
          }
          name="location"
          styles={customStyles}
          options={locationOptions}
          value={
            filterData?.location
              ? { value: filterData.location, label: filterData.location }
              : locationOptions[0]
          }
          className="select-custom filterSelect"
          classNamePrefix="select"
          onChange={handleChange}
          required
        />
      )}
    </>
  );
};

export default Location;
