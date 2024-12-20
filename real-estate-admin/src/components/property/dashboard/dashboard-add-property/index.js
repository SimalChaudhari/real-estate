"use client"

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
// import { cookies } from "next/headers";
const AddPropertyTabContent = () => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    description: {},
    media: [],
    location: {},
    details: {},
    amenities: [],
  });
  const [activeTab, setActiveTab] = useState(0);

  const handleFormUpdate = (key, data) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  const handleSubmit = () => {
    const isValid =
      formData.description.title &&
      formData.description.description &&
      formData.media.length > 0 &&
      Object.values(formData.location).every((val) => val) &&
      Object.values(formData.details).every((val) => val) &&
      formData.amenities.length > 0;

    if (isValid) {
      // dispatch(createProperty(formData));
      console.log("Submitted Data:", formData);
    } else {
      console.error("Please fill in all fields before submitting.");
    }
  };



  return (
    <div>
      <nav>
         <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          {[
            "Description",
            "Media",
            "Location",
            "Details",
            "Amenities",
          ].map((tab, index) => (
            <button
              key={index}
              className={`nav-link fw600 ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
              type="button"
            >
              {index + 1}. {tab}
            </button>
          ))}
        </div>
      </nav>
      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
      {activeTab === 0 && (
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Property Description</h4>
            <PropertyDescription 
            onUpdate={(data) => handleFormUpdate("description", data)}
            />
          </div>
        </div>
      )}
      {activeTab === 1 && (
        <div className="tab-pane fade show active"
        id="nav-item2"
        role="tabpanel"
        aria-labelledby="nav-item2-tab"
        
        >
          <UploadMedia
            onUpdate={(data) => handleFormUpdate("media", data)}
          />
        </div>
      )}
      {activeTab === 2 && (
        <div className="tab-pane fade show active"
  
        id="nav-item3"
        role="tabpanel"
        aria-labelledby="nav-item3-tab"
      >
        <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <h4 className="title fz17 mb30">Listing Location</h4>
          <LocationField
            onUpdate={(data) => handleFormUpdate("location", data)}
          />
        </div>
        </div>
      )}
      {activeTab === 3 && (
        <div className="tab-pane fade show active"
        id="nav-item4"
        role="tabpanel"
        aria-labelledby="nav-item4-tab"
      >
        <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <h4 className="title fz17 mb30">Listing Details</h4>
          <DetailsFiled
            onUpdate={(data) => handleFormUpdate("details", data)}
          />
        </div>
        </div>

      )}
      {activeTab === 4 && (
        <div className="tab-pane fade show active"

        id="nav-item5"
        role="tabpanel"
        aria-labelledby="nav-item5-tab"
      >
        <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <h4 className="title fz17 mb30">Select Amenities</h4>
          <div className="row">
          <Amenities
            onUpdate={(data) => handleFormUpdate("amenities", data)}
          />
        </div>
        </div>
        </div>
      )}
      
      <div className="d-flex justify-content-center mb-2">
      <button 
        className="btn btn-warning d-flex align-items-center ud-btn btn-dark" 
        style={{ backgroundColor: "black", color: "white", border: "none" }}
        onClick={handleSubmit}
      >
        Submit
        <i className="fal fa-arrow-right-long ms-2" />
      </button>
    </div>
    
  </div>
</div>
  );
};

export default AddPropertyTabContent;
