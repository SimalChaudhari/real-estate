"use client"

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import { createProperty } from "@/redux/actions/propertyActions";
// import { cookies } from "next/headers";
const AddPropertyTabContent = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    description: {
      title: "",
      description: "",
      status: "",
      rent_price: "",
      sale_price: "",
      tags: [],
      propertyType: "",
    },
    media: [],
    location: {
      street_address: "",
      city: "",
      state: "",
      country: "",
      zip_code: "",
      lat: "",
      long: "",
    },
    details: {
      bed: "",
      bath: "",
      sqft: "",
      yearBuilding: "",
      start_date: "",
    },
    amenities: [],
  });

  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState("");

  const handleFormUpdate = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    return (
      formData.description.title &&
      formData.description.description &&
      formData.media.length > 0 &&
      formData.location.street_address &&
      formData.location.city &&
      formData.location.state &&
      formData.location.zip_code &&
      formData.location.lat &&
      formData.location.long &&
      formData.details.bed &&
      formData.details.bath &&
      formData.details.sqft &&
      formData.description.tags.length > 0 &&
      formData.description.propertyType &&
      formData.amenities.length > 0
    );
  };

  const handleSubmit = async() => {
    if (validateForm()) {
      setError("");

      // Combine all sections into a single payload
      const payload = {
        title: formData.description.title,
        description: formData.description.description,
        status: formData.description.status,
        rent_price: formData.description.rent_price,
        sale_price: formData.description.sale_price,
        images: formData.media,
        street_address: formData.location.street_address,
        city: formData.location.city,
        state: formData.location.state,
        zip_code: formData.location.zip_code,
        lat: formData.location.lat,
        long: formData.location.long,
        bed: formData.details.bed,
        bath: formData.details.bath,
        sqft: formData.details.sqft,
        forRent: false, // Assuming default value
        start_date: formData.details.start_date,
        tags: formData.description.tags,
        propertyType: formData.description.propertyType,
        yearBuilding: formData.details.yearBuilding,
        featured: true, // Assuming default value
        features: formData.amenities,
      };

      console.log("Submitted Data:", payload);

      // Uncomment and use when Redux or API call is ready
      await dispatch(createProperty(payload));
    } else {
      setError("Please fill in all fields before submitting.");
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
              {tab}
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
                data={formData.description}
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
              data={formData.media}
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
                data={formData.location}
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
                data={formData.details}
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
                  data={formData.amenities}
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
