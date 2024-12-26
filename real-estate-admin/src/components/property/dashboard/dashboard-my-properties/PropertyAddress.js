"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchData } from "./fetch-data";

const PropertyAddress = ({ id }) => {

  const { fetchByData } = useFetchData()
  
  const transformedListingsData = useSelector((state) => state.property?.propertyByID || []);

  useEffect(() => {
      fetchByData(id)
  }, [])

  if (!transformedListingsData) {
    return <div>No property found.</div>; // Handle case where no property matches
  }

  // const addresses = [
  //   {
  //     address: "10425 Tabor St",
  //     city: "Los Angeles",
  //     state: "California",
  //     zipCode: "90034",
  //     area: "Brookside",
  //     country: "United States",
  //   },
  //   {
  //     address: "10 Downing Street",
  //     city: "London",
  //     state: "Greater London",
  //     zipCode: "SW1A 2AA",
  //     area: "Westminster",
  //     country: "United Kingdom",
  //   },
  // ];

  // const addressDetails = {
  //   // address: transformedListingsData.address || "N/A",
  //   address: transformedListingsData.street_address || "N/A",
  //   city: transformedListingsData.city || "N/A",
  //   state: transformedListingsData.location || "N/A", // Assuming "location" represents state/county
  //   zipCode: transformedListingsData.zip_code || "N/A",
  //   country: "N/A", // Update this if a country field exists in your data
  // };

  const addressDetails = transformedListingsData.address
  return (
    <div>

      {/*
      // {addresses.map((address, index) => (
      //   <div
      //     key={index}
      //     className={`col-md-6 col-xl-4 ${index === 1 ? "offset-xl-2" : ""}`}
      //   >
      //     <div className="d-flex justify-content-between">
      //       <div className="pd-list">
      //         <p className="fw600 mb10 ff-heading dark-color">Address</p>
      //         <p className="fw600 mb10 ff-heading dark-color">City</p>
      //         <p className="fw600 mb-0 ff-heading dark-color">State/county</p>
      //       </div>
      //       <div className="pd-list">
      //         <p className="text mb10">{address.address}</p>
      //         <p className="text mb10">{address.city}</p>
      //         <p className="text mb-0">{address.state}</p>
      //       </div>
      //     </div>
      //   </div>
      // ))}

      // <div className="col-md-12">
      //   <iframe
      //     className="position-relative bdrs12 mt30 h250"
      //     loading="lazy"
      //     src={`https://maps.google.com/maps?q=${addresses[1].address}&t=m&z=14&output=embed&iwloc=near`}
      //     title={addresses[1].address}
      //     aria-label={addresses[1].address}
      //   />
      // </div>
      */}



      <div className="col-md-12 col-xl-12">

        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between gap-5">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">Address</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{addressDetails?.street_address}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between gap-5">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">City</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{addressDetails?.city}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between gap-5">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">State/county</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{addressDetails?.state}</p>
            </div>
          </div>
        </div>
      </div>

      {/*
        <div className="col-md-12 col-xl-12">
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">Address</p>
              <p className="fw600 mb10 ff-heading dark-color">City</p>
              <p className="fw600 mb-0 ff-heading dark-color">State/county</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{addressDetails?.address}</p>
              <p className="text mb10">{addressDetails?.city}</p>
              <p className="text mb-0">{addressDetails?.state}</p>
            </div>
          </div>
        </div>
  */}


      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            addressDetails?.street_address
          )}&t=m&z=14&output=embed&iwloc=near`}
          title={addressDetails?.street_address}
          aria-label={addressDetails?.street_address}
        />
      </div>

    </div>
  );
};

export default PropertyAddress;
