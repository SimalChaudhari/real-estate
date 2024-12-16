"use client";

import { fetchListingsFailure, fetchListingsStart, fetchListingsSuccess } from "@/app/features/listingsSlice";
import LoadingComponent from "@/app/LoadingComponent";
import { GetList } from "@/services/listing/listingApi";
import listings from "@/data/listings";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PropertyHeader = ({ id }) => {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchListings = async () => {
      dispatch(fetchListingsStart());
      try {
        const data = await GetList();
        if (data.success) {
          dispatch(fetchListingsSuccess(data.data || []));
        } else {
          console.error("Error in fetching data:", data.message);
        }
      } catch (error) {
        dispatch(fetchListingsFailure(error.message));
        console.error("Error fetching listings:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [dispatch]);

  // Get listingsData from Redux
  const listingsData = useSelector((state) => state.listings?.listings);


  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  // Check for static or dynamic data
  const transformedListingsData =
    listingsData.find((elm) => elm._id === id) ||
    listingsData[0];

  if (loading) {
    return <div><LoadingComponent /></div>; // Display loading state
  }
  
  if (!transformedListingsData) {
    return <div>No property found.</div>; // Handle case where no property matches
  }

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{transformedListingsData?.title}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {/*
            {transformedListingsData?.location}
            */}
              {transformedListingsData?.address?.street_address},{" "}
              {transformedListingsData?.address?.city},{" "}
              {transformedListingsData?.address?.state} {" "}

            </p>
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              For {transformedListingsData?.forRent ? "rent" : "sale"}
            </a>
            <a
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
            >
              <i className="far fa-clock pe-2" />
              {Number(new Date().getFullYear()) -
                Number(transformedListingsData?.yearBuilding)}{" "}
              years ago
            </a>
            <a className="ff-heading ml10 ml0-sm fz15" href="#">
              <i className="flaticon-fullscreen pe-2 align-text-top" />
              8721
            </a>
          </div>
          <div className="property-meta d-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-bed pe-2 align-text-top" />
              {transformedListingsData?.bed} bed
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-shower pe-2 align-text-top" />
              {transformedListingsData?.bath} bath
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-expand pe-2 align-text-top" />
              {transformedListingsData?.sqft} sqft
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#">
                <span className="flaticon-like" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-new-tab" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-share-1" />
              </a>
              <a className="icon" href="#">
                <span className="flaticon-printer" />
              </a>
            </div>
            {/*
              <h3 className="price mb-0">{transformedListingsData?.price}</h3>
              */}
            {/*
            {(
              Number(transformedListingsData?.price.split("₹")[1].split(",").join("")) / transformedListingsData?.sqft
            ).toFixed(2)}
            */}
            <p className="text space fz15">
            {transformedListingsData.price && (
              <div>
                <span>Rent: ₹{transformedListingsData.price.rent}</span>
                /sq ft
                <br />
                <span>Sale: ₹{transformedListingsData.price.sale}</span>
                /sq ft
              </div>
            )}
            </p>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
