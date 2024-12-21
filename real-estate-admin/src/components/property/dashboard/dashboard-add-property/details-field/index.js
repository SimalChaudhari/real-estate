"use client";
import React, { useEffect, useState } from "react";

const DetailsFiled = ({ data = {}, onUpdate }) => {
  const [formData, setFormData] = useState({
    sqft: "",
    bed: "",
    bath: "",
    yearBuilding: "",
    start_date: "",
    ...data
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...data, // Update local state when parent data changes
    }));
  }, [data]);

  const handleInputChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    onUpdate(updatedData); // Notify parent of changes
  }
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              sqft in Sqft (only numbers)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter sqft in Sqft"
              value={formData.sqft}
              onChange={(e) => handleInputChange("sqft", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              bed
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter number of bed"
              value={formData.bed}
              onChange={(e) => handleInputChange("bed", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              bath
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter number of bath"
              value={formData.bath}
              onChange={(e) => handleInputChange("bath", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Year built (numeric)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter year built"
              value={formData.yearBuilding}
              onChange={(e) => handleInputChange("yearBuilding", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Available from (date)
            </label>
            <input
              type="date"
              className="form-control"
              value={formData.start_date}
              onChange={(e) => handleInputChange("start_date", e.target.value)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default DetailsFiled;
