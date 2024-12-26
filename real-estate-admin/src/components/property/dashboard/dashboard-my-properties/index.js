"use client"

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import { createProperty } from "@/redux/actions/propertyActions";
import { useRouter } from 'next/navigation'

// import { cookies } from "next/headers";
const AddPropertyTabContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
      country: "India",
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
      forRent: false,

    },
    amenities: [],
  });

  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState("");

  const handleFormUpdate = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    // Store error messages and their corresponding tabs
    const errors = [];

    if (!formData.description.title) errors.push({ tab: 0, field: "Title is required" });
    if (!formData.description.description) errors.push({ tab: 0, field: "Description is required" });
    if (formData.media.length === 0) errors.push({ tab: 1, field: "At least one media file is required" });
    if (!formData.location.street_address) errors.push({ tab: 2, field: "Street address is required" });
    if (!formData.location.city) errors.push({ tab: 2, field: "City is required" });
    if (!formData.location.state) errors.push({ tab: 2, field: "State is required" });
    if (!formData.location.zip_code) errors.push({ tab: 2, field: "Zip code is required" });
    if (!formData.location.lat) errors.push({ tab: 2, field: "Latitude is required" });
    if (!formData.location.long) errors.push({ tab: 2, field: "Longitude is required" });
    if (!formData.details.bed) errors.push({ tab: 3, field: "Number of beds is required" });
    if (!formData.details.bath) errors.push({ tab: 3, field: "Number of baths is required" });
    if (!formData.details.sqft) errors.push({ tab: 3, field: "Square footage is required" });
    if (formData.description.tags.length === 0) errors.push({ tab: 0, field: "At least one tag is required" });
    if (!formData.description.propertyType) errors.push({ tab: 0, field: "Property type is required" });
    if (formData.amenities.length === 0) errors.push({ tab: 4, field: "At least one amenity is required" });

    if (errors.length > 0) {
      setError(errors[0].field); // Display the first error message
      setActiveTab(errors[0].tab); // Navigate to the tab with the first error
      return false;
    }

    setError("");
    return true;
  };



  const handleSubmit = async () => {
    if (validateForm()) {
      setError("");

      const payload = new FormData();

      // Append description fields
      payload.append("title", formData.description.title);
      payload.append("description", formData.description.description);
      payload.append("status", formData.description.status);
      payload.append("rent_price", formData.description.rent_price);
      payload.append("sale_price", formData.description.sale_price);

      // Append media files
      // Handle media files
      formData.media.forEach((file, index) => {
        if (file instanceof File) {
          // If it's a File object
          payload.append("images", file);
        } else if (typeof file === "string" && file.startsWith("data:image/")) {
          // Convert base64 to Blob
          const mimeType = file.match(/data:(.*?);base64,/)[1];
          const base64Data = file.replace(/^data:image\/\w+;base64,/, "");
          const binaryData = atob(base64Data);
          const array = [];
          for (let i = 0; i < binaryData.length; i++) {
            array.push(binaryData.charCodeAt(i));
          }
          const blob = new Blob([new Uint8Array(array)], { type: mimeType });
          payload.append("images", blob, `image_${index}.${mimeType.split("/")[1]}`);
        }
      });

      // Append location fields
      payload.append("street_address", formData.location.street_address);
      payload.append("city", formData.location.city);
      payload.append("state", formData.location.state);
      payload.append("zip_code", formData.location.zip_code);
      payload.append("lat", formData.location.lat);
      payload.append("long", formData.location.long);
      payload.append("country", formData.location.country);
      payload.append("forRent", formData.details.forRent);
      // Append details fields
      payload.append("bed", formData.details.bed);
      payload.append("bath", formData.details.bath);
      payload.append("sqft", formData.details.sqft);
      payload.append("yearBuilding", formData.details.yearBuilding);
      payload.append("start_date", formData.details.start_date);

      // Append tags and property type
      formData.description.tags.forEach((tag) => payload.append("tags[]", tag));
      payload.append("propertyType", formData.description.propertyType);

      // Append amenities
      formData.amenities.forEach((amenity) => payload.append("features[]", amenity));
      try {
        await dispatch(createProperty(payload));
        // router.push("/dashboard-my-properties");
        resetForm(); // Reset form fields
      } catch (error) {
        console.error("Submission failed:", error);
      }
    } else {
      setError("Please fill in all fields before submitting.");
    }
  }

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
        {activeTab === 4 && (
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
        )}
      </div>

    </div>
  );
};

export default AddPropertyTabContent;
