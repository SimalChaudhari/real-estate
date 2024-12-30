"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocationFailure, fetchLocationsStart, fetchLocationsSuccess } from "@/app/features/locationsSlice";
import { GetLocationList } from "@/services/listing/locationApi";

const AdvanceFilterModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { location } = useSelector((state) => state.location);
  const listingsData = useSelector((state) => state.listings?.listings);

  // States for filters
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBedroom, setSelectedBedroom] = useState("any");
  const [selectedBathroom, setSelectedBathroom] = useState("any");
  const [areaOptions, setAreaOptions] = useState([]);

  // Extract city options from Redux store
  const locationOptions =
    location[0]?.cities?.map((city) => ({
      value: city.name,
      label: city.name,
      areas: city.areas || [],
    })) || [];

  // Extract unique property types
  const propertyTypeOptions =
    [...new Set(listingsData?.map((item) => item.propertyType))]?.map((type) => ({
      value: type,
      label: type,
    })) || [];

  const customStyles = {
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isFocused
          ? "#eb675312"
          : undefined,
    }),
  };

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      dispatch(fetchLocationsStart());
      try {
        const response = await GetLocationList();
        if (response.success) {
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

  // Handle city selection
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setAreaOptions(
      selectedOption?.areas?.map((area) => ({
        value: area,
        label: area,
      })) || []
    );
    setSelectedArea(null); // Reset selected area when city changes
  };

  // Handle reset filters
  const handleReset = () => {
    setSelectedCity(null);
    setSelectedArea(null);
    setSelectedType(null);
    setPriceRange([0, 100000]);
    setSelectedBedroom("any");
    setSelectedBathroom("any");
    setAreaOptions([]);
  };

  // Handle search button click
  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (selectedCity) queryParams.append("city", selectedCity.value);
    if (selectedArea) queryParams.append("area", selectedArea.value);
    if (selectedType) queryParams.append("type", selectedType.value);
    if (priceRange[0] || priceRange[1]) {
      queryParams.append("priceMin", priceRange[0]);
      queryParams.append("priceMax", priceRange[1]);
    }
    if (selectedBedroom !== "any") queryParams.append("bedrooms", selectedBedroom);
    if (selectedBathroom !== "any") queryParams.append("bathrooms", selectedBathroom);

    router.push(`/list-v1?${queryParams.toString()}`);
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            More Filter
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>

        {/* Modal Body */}
        <div className="modal-body pb-0">
          {/* Price Range */}
          <div className="row">
            <div className="col-lg-12">
              <h6 className="list-title mb20">Price Range</h6>
              <PriceRange value={priceRange} onChange={setPriceRange} />
            </div>
          </div>

          {/* Property Type */}
          <div className="row">
            <div className="col-sm-12">
              <h6 className="list-title">Type</h6>
              <Select
                options={propertyTypeOptions}
                styles={customStyles}
                placeholder="Select Property Type"
                isClearable
                onChange={(option) => setSelectedType(option)}
              />
            </div>
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bedroom onChange={setSelectedBedroom} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom onChange={setSelectedBathroom} />
                </div>
              </div>
            </div>
          </div>

          {/* Location and Area */}
          <div className="row">
            <div className="col-sm-6">
              <h6 className="list-title">Location</h6>
              <Select
                options={locationOptions}
                styles={customStyles}
                placeholder="Select City"
                isClearable
                onChange={handleCityChange}
              />
            </div>
            <div className="col-sm-6">
              <h6 className="list-title">Area</h6>
              <Select
                options={areaOptions}
                styles={customStyles}
                placeholder="Select Area"
                isClearable
                isDisabled={!selectedCity}
                onChange={(option) => setSelectedArea(option)}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer justify-content-between">
          <button className="reset-button" onClick={handleReset}>
            <u>Reset all filters</u>
          </button>
          <button type="submit" className="ud-btn btn-thm" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
