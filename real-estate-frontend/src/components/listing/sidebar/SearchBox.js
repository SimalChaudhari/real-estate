"use client";

import React from "react";

const SearchBox = ({ filterFunctions, filterData }) => {
  return (
    <div className="search_area">
      <input
        type="text"
        className="form-control"
        placeholder="What are you looking for?"
        value={filterData?.searchQuery || ""} // Display current search query
        onChange={(e) => filterFunctions?.setSearchQuery(e.target.value)} // Update search query
      />
      <label>
        <span className="flaticon-search" />
      </label>
    </div>
  );
};

export default SearchBox;
