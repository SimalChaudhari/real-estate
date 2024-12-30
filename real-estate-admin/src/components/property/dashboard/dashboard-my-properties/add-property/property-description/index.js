"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const PropertyDescription = ({ data = {}, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: [],
    tags: [],
    status: "",
    sale_price: "",
    rent_price: "",
    ...data, // Initialize with data from parent
  });
  const categoryOptions = [
    { value: "Villa", label: "Villa" },
    { value: "Penthouse", label: "Penthouse" },
    { value: "Duplex", label: "Duplex" },
    { value: "Studio Apartment", label: "Studio Apartment" },
    { value: "Row House", label: "Row House" },
    { value: "Farmhouse", label: "Farmhouse" },
    { value: "Commercial Office", label: "Commercial Office" },
    { value: "Retail Shop", label: "Retail Shop" },
    { value: "Industrial Shed", label: "Industrial Shed" },
    { value: "Serviced Apartment", label: "Serviced Apartment" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Condominium", label: "Condominium (Condo)" },
    { value: "Warehouse", label: "Warehouse" },
    { value: "Land/Plot", label: "Land/Plot" },
    { value: "Independent House", label: "Independent House" },
  ];
  
  const tagsOptions = [
    { value: "All Listing", label: "All Listing" },
    { value: "Active", label: "Active" },
    { value: "Sold", label: "Sold" },
    { value: "Processing", label: "Processing" },
  ];
  const propertyStatusOptions = [
    { value: "All Cities", label: "All Cities" },
    { value: "Available", label: "Available" },
    { value: "Buy", label: "Buy" },
    { value: "Rent", label: "Rent" },
    { value: "Sold", label: "Sold" },
    { value: "Pending", label: "Pending" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
        ? "#eb675312"
        : isFocused
        ? "#eb675312"
        : undefined,
    }),
  };

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
  };

  const handleMultiSelectChange = (key, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    handleInputChange(key, selectedValues);
  };
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Property Title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Description
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder="Enter property description"
              className="form-control"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Property Type
            </label>
            <div className="location-area">
              <Select
                options={categoryOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                isMulti
                value={categoryOptions.filter((option) =>
                  formData.propertyType.includes(option.value)
                )}
                onChange={(selected) =>
                  handleMultiSelectChange("propertyType", selected)
                }
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Tags</label>
            <div className="location-area">
              <Select
                options={tagsOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                isMulti
                value={tagsOptions.filter((option) =>
                  formData.tags.includes(option.value)
                )}
                onChange={(selected) =>
                  handleMultiSelectChange("tags", selected)
                }
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Property Status
          </label>
          <div className="location-area">
            <Select
              options={propertyStatusOptions}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              value={propertyStatusOptions.find(
                (option) => option.value === formData.status
              )} // Match the selected value
              onChange={(selected) =>
                handleInputChange("status", selected?.value || "")
              } // Save only the value
            />
          </div>
        </div>
      </div>
      
      

        <div className="col-sm-6 col-xl-6">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Selling Price
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Selling Price"
              value={formData.sale_price}
              onChange={(e) => handleInputChange("sale_price", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-6">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Rent Price
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Rent Price"
              value={formData.rent_price}
              onChange={(e) => handleInputChange("rent_price", e.target.value)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PropertyDescription;
