"use client";

import React from "react";
import { useSelector } from "react-redux";

const ProperytyDescriptions = ({ id }) => {

  const listingsData = useSelector((state) => state.listings?.listings);
  // Check for static or dynamic data
  const transformedListingsData =
    listingsData.find((elm) => elm._id === id) ||
    listingsData[0];

  const fullDescription = transformedListingsData?.description;
  const truncatedDescription = fullDescription?.split(" ").slice(0, 82).join(" ");
  const truncatedDescription2 = fullDescription?.split(" ").slice(82).join(" ");

  if (!transformedListingsData) {
    return <div>No property found.</div>; // Handle case where no property matches
  }
  return (
    <div>
      <p className="text mb10">
        {truncatedDescription}
      </p>
      <div className="agent-single-accordion">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
              style={{}}
            >
              <div className="accordion-body p-0">
                <p className="text">

                  {truncatedDescription2}
                </p>
              </div>
            </div>
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button p-0 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Show more
              </button>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProperytyDescriptions;
