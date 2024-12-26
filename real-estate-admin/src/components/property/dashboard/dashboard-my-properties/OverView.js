"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchData } from "./fetch-data";


const OverView = ({ id }) => {

    const { fetchByData } = useFetchData()
  
    const transformedListingsData = useSelector((state) => state.property?.propertyByID || []);
  
    useEffect(() => {
        fetchByData(id)
    }, [])
  


  if (!transformedListingsData) {
    return <div>No property found.</div>; // Handle case where no property matches
  }

  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: transformedListingsData?.bed,
    },
    {
      icon: "flaticon-shower",
      label: "Bath",
      value: transformedListingsData?.bath,
    },
    {
      icon: "flaticon-event",
      label: "Year Built",
      value: transformedListingsData?.yearBuilding,
    },
    // {
    //   icon: "flaticon-garage",
    //   label: "Garage",
    //   value: "2",
    //   xs: true,
    // },
    {
      icon: "flaticon-expand",
      label: "Sqft",
      value: transformedListingsData?.sqft,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: transformedListingsData?.propertyType,
    },
  ];


  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
