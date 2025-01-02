"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "rc-slider/assets/index.css";
import LookingFor from "./LookingFor";
import Location from "./Location";
import Area from "./Area";
import { useDispatch } from "react-redux";
import {
  fetchLocationFailure,
  fetchLocationsStart,
  fetchLocationsSuccess,
} from "@/app/features/locationsSlice";
import { GetLocationList } from "@/services/listing/locationApi";

const FilterContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("buy");
  const [price, setPrice] = useState([2000, 45000]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations();
  }, []);

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

  // Handle tab click
  const handleTabClick = (tab) => setActiveTab(tab);

  // Handle search button click
  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    queryParams.append("status", activeTab);
    queryParams.append("priceMin", price[0]);
    queryParams.append("priceMax", price[1]);

    if (selectedPropertyType) queryParams.append("propertyType", selectedPropertyType.value);
    if (selectedCity) queryParams.append("city", selectedCity.value);
    if (selectedArea) queryParams.append("area", selectedArea);
    if (searchKeyword) queryParams.append("keyword", searchKeyword);

    router.push(`/list-v1?${queryParams.toString()}`);
  };

  // Tabs configuration
  const tabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "sold", label: "Sold" },
  ];

  return (
    <div className="advance-style4 at-home5 mt-100 mt50-lg mb10 mx-auto animate-up-2">
      {/* Tabs */}
      <ul className="nav nav-tabs p-0 m-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content text-start">
        {tabs.map((tab) => (
          <div
            className={`tab-pane ${activeTab === tab.id ? "active" : ""}`}
            key={tab.id}
          >
            <div className="advance-content-style3 at-home5">
              <div className="row align-items-center">
                {/* Search Input */}
                <div className="col-md-4 col-xl-3 bdrr1 bdrrn-sm">
                  <label>Search</label>
                  <div className="advance-search-field position-relative">
                    <form
                      className="form-search position-relative"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                      }}
                    >
                      <div className="box-search">
                        <input
                          className="form-control bgc-f7 bdrs12 ps-0"
                          type="text"
                          name="search"
                          value={searchKeyword}
                          onChange={(e) => setSearchKeyword(e.target.value)}
                          placeholder={`Enter Keyword for ${tab.label}`}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                {/* Looking For Dropdown */}
                <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm">
                  <label className="fz14">Looking For</label>
                  <LookingFor onPropertyTypeChange={setSelectedPropertyType} />
                </div>


                {/* City Dropdown */}
                <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm">
                  <label className="fz14">City</label>
                  <Location onCityChange={setSelectedCity} />
                </div>

                {/* Area Dropdown */}
                <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm">
                  <label className="fz14">Area</label>
                  <Area areas={selectedCity?.areas || []} onAreaChange={setSelectedArea} />
                </div>

                {/* Search Buttons */}
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                    <button
                      className="advance-search-btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#advanceSearchModal"
                    >
                      <span className="flaticon-settings" /> Advanced
                    </button>
                    <button
                      className="advance-search-icon ud-btn btn-thm ms-4"
                      type="button"
                      onClick={handleSearch}
                    >
                      <span className="flaticon-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterContent;
