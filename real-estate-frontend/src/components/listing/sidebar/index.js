"use client";

import React from "react";
import SearchBox from "./SearchBox";
import ListingStatus from "./ListingStatus";
import PropertyType from "./PropertyType";
import PriceSlider from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Location from "./Location";
import SquareFeet from "./SquareFeet";
import YearBuilt from "./YearBuilt";

const ListingSidebar = ({ filterFunctions, filterData }) => {

  return (
    <div className="list-sidebar-style1">
      <div className="widget-wrapper">
        <h6 className="list-title">Find your home</h6>
        <SearchBox filterFunctions={filterFunctions} filterData={filterData} />
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Listing Status</h6>
        <div className="radio-element">
          <ListingStatus filterFunctions={filterFunctions} filterData={filterData} />
        </div>
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Property Type</h6>
        <div className="checkbox-style1">
          <PropertyType filterFunctions={filterFunctions} filterData={filterData} />
        </div>
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Rent Price Range</h6>
        <div className="range-slider-style1">
          <PriceSlider filterFunctions={filterFunctions} filterData={filterData} />
        </div>
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Bedrooms</h6>
        <div className="d-flex">
          <Bedroom filterFunctions={filterFunctions} filterData={filterData} />
        </div>
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Bathrooms</h6>
        <div className="d-flex">
          <Bathroom filterFunctions={filterFunctions} filterData={filterData} />
        </div>
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Location</h6>
        <div className="form-style2 input-group">
          <Location filterFunctions={filterFunctions} filterData={filterData} />
        </div>
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Square Feet</h6>
        <SquareFeet filterFunctions={filterFunctions} filterData={filterData} />
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Year Built</h6>
        <YearBuilt filterFunctions={filterFunctions} filterData={filterData} />
      </div>

      <div className="reset-area d-flex align-items-center justify-content-between">
        <div
          onClick={() => filterFunctions.resetFilter()}
          className="reset-button cursor"
        >
          <span className="flaticon-turn-back" />
          <u>Reset all filters</u>
        </div>
        <div className="reset-button cursor">
          <span className="flaticon-favourite" />
          <u>Save Search</u>
        </div>
      </div>
    </div>
  );
};

export default ListingSidebar;
