"use client";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Image from "next/image";
import Select from "react-select";

const AddPropertyTabContentCustomer = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageError, setImageError] = useState(null); 
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const categoryOptions = [
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Loft", label: "Loft" },
    { value: "Office", label: "Office" },
    { value: "Townhome", label: "Townhome" },
    { value: "Villa", label: "Villa" },
  ];
  const listedIn = [
    { value: "Rent", label: "Rent" },
    { value: "Sold", label: "Sold" },
  ];
  const PropertyStatus = [
    { value: "All Cities", label: "All Cities" },
    { value: "Pending", label: "Pending" },
    { value: "Processing", label: "Processing" },
    { value: "Published", label: "Published" },
  ];


  const Countries = [
    { value: "India", label: "India" },
  ];

  const Cities = [
    { value: "CHIKKAMAGALURU", label: "CHIKKAMAGALURU" },
    { value: "BANGALORE", label: "BANGALORE" },
    { value: "SAKLESHPURA", label: "SAKLESHPURA" },
    { value: "MADIKERI", label: "MADIKERI" },
    { value: "MANGALORE", label: "MANGALORE" },
    { value: "UDUPI", label: "UDUPI" }
  ];

  const States = [
    { value: "Karnataka", label: "Karnataka" }
  ];

  const AmenitiesData = [
    { value: "Attic", label: "Attic" },
    { value: "Basketball court", label: "Basketball court" },
    { value: "Air Conditioning", label: "Air Conditioning" },
    { value: "Lawn", label: "Lawn" },
    { value: "Swimming Pool", label: "Swimming Pool" },
    { value: "Barbeque", label: "Barbeque" },
    { value: "Microwave", label: "Microwave" },

    { value: "TV Cable", label: "TV Cable" },
    { value: "Dryer", label: "Dryer" },
    { value: "Outdoor Shower", label: "Outdoor Shower" },
    { value: "Washer", label: "Washer" },
    { value: "Gym", label: "Gym" },
    { value: "Ocean view", label: "Ocean view" },
    { value: "Private space", label: "Private space" },

    { value: "Lake view", label: "Lake view" },
    { value: "Wine cellar", label: "Wine cellar" },
    { value: "Front yard", label: "Front yard" },
    { value: "Refrigerator", label: "Refrigerator" },
    { value: "WiFi", label: "WiFi" },
    { value: "Laundry", label: "Laundry" },
    { value: "Sauna", label: "Sauna" },
  ];


  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
            ? "#eb675312"
            : isFocused
              ? "#eb675312"
              : undefined,
      };
    },
  };

  const handleUpload = (files) => {
    setImageError(null); // Reset error

    const validFormats = ["image/jpeg", "image/png"];
    const newImages = [...uploadedImages];

    for (const file of files) {
      if (!validFormats.includes(file.type)) {
        setImageError("Only JPEG and PNG formats are allowed.");
        continue;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        setUploadedImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    // Programmatically trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  const handleFormSubmit = (data) => {
    if (uploadedImages.length === 0) {
      setImageError("At least one image is required.");
      return;
    }

    console.log("Form Data Submitted:", {
      ...data,
      uploadedImages,
    });
  };

  return (
    <div>

      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Property Description</h4>
            {/*
              <PropertyDescription />
            */}
            <form className="form-style1" onSubmit={handleSubmit(handleFormSubmit)}>
              <div >

                <div className="row">
                  <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">Title</label>
                      <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        placeholder="Title"
                      />
                      {errors.title && <p className="text-danger">{errors.title.message}</p>}
                    </div>
                  </div>
                  {/* End .col-12 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">
                        Description
                      </label>
                      <textarea
                        // cols={30}
                        // rows={5}
                        rows={1}
                        placeholder="There are many variations of passages."
                        {...register("description", { required: "Title is required" })}
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        defaultValue={""}
                      />
                      {errors.description && <p className="text-danger">{errors.description.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">
                        Select Property
                      </label>
                      <div className="location-area">
                        <Controller
                          name="category"
                          control={control}
                          rules={{ required: "Property type is required" }}
                          render={({ field }) => (
                            <Select {...field} options={categoryOptions} styles={customStyles}

                              className={`select-custom pl-0 ${errors.description ? "is-invalid" : ""}`}
                              classNamePrefix="select"
                            />
                          )}
                        />
                        {errors.category && <p className="text-danger">{errors.category.message}</p>}
                      </div>
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">
                        Property Status
                      </label>
                      <div className="location-area">
                        <Controller
                          name="listedIn"
                          control={control}
                          rules={{ required: "Property Status is required" }}
                          render={({ field }) => (
                            <Select {...field} options={listedIn} styles={customStyles}

                              className={`select-custom pl-0 ${errors.listedIn ? "is-invalid" : ""}`}
                              classNamePrefix="select"
                            />
                          )}
                        />
                        {errors.listedIn && <p className="text-danger">{errors.listedIn.message}</p>}

                      </div>
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb30">
                      <label className="heading-color ff-heading fw600 mb10">
                        Price in ₹
                      </label>
                      <input
                        type="number" {...register("price", {
                          required: "Price is required",
                          min: { value: 1, message: "Price must be greater than 0" },
                        })}
                        className={`form-control ${errors.price ? "is-invalid" : ""}`}
                        placeholder="Your Name"
                      />
                      {errors.price && <p className="text-danger">{errors.price.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}
                </div>

                <hr />
                <h4 className="title fz17 mb30">Address</h4>

                <div className="row">
                  <div className="col-sm-6 col-xl-4">
                    <div className="mb30">
                      <label className="heading-color ff-heading fw600 mb10">
                        Address
                      </label>
                      <input
                        type="text"
                        {...register("address", { required: "Address is required" })}
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        placeholder="Address"
                      />
                      {errors.address && <p className="text-danger">{errors.address.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb30">
                      <label className="heading-color ff-heading fw600 mb10">
                        Latitude
                      </label>
                      <input
                        type="number"
                        {...register("latitude", { required: "Latitude is required" })}
                        className={`form-control ${errors.latitude ? "is-invalid" : ""}`}
                        placeholder="Latitude"
                      />
                      {errors.latitude && <p className="text-danger">{errors.latitude.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb30">
                      <label className="heading-color ff-heading fw600 mb10">
                        LongiTude
                      </label>
                      <input
                        type="number"
                        {...register("longiTude", { required: "Latitude is required" })}
                        className={`form-control ${errors.longiTude ? "is-invalid" : ""}`}
                        placeholder="LongiTude"
                      />
                      {errors.longiTude && <p className="text-danger">{errors.longiTude.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}


                  <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">
                        Cities
                      </label>
                      <div className="location-area">
                        <Controller
                          name="city"
                          control={control}
                          rules={{ required: "City is required" }}
                          render={({ field }) => (
                            <Select {...field} options={Cities} styles={customStyles}

                              className={`select-custom pl-0 ${errors.city ? "is-invalid" : ""}`}
                              classNamePrefix="select"
                            />
                          )}
                        />
                        {errors.city && <p className="text-danger">{errors.city.message}</p>}

                      </div>
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">
                        States
                      </label>
                      <div className="location-area">
                        <Controller
                          name="state"
                          control={control}
                          rules={{ required: "State is required" }}
                          render={({ field }) => (
                            <Select {...field} options={States} styles={customStyles}

                              className={`select-custom pl-0 ${errors.state ? "is-invalid" : ""}`}
                              classNamePrefix="select"
                            />
                          )}
                        />
                        {errors.state && <p className="text-danger">{errors.state.message}</p>}

                      </div>
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb30">
                      <label className="heading-color ff-heading fw600 mb10">
                        Zip Code
                      </label>
                      <input
                        type="number"
                        {...register("zipcode", { required: "Zip Code is required" })}
                        className={`form-control ${errors.zipcode ? "is-invalid" : ""}`}
                        placeholder="Zip Code"
                      />
                      {errors.zipcode && <p className="text-danger">{errors.zipcode.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}

                </div>

                <hr />
                <h4 className="title fz17 mb30">Features</h4>

                <div className="row">

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">
                        Tags
                      </label>
                      <div className="location-area">

                        <Controller
                          name="tag"
                          control={control}
                          rules={{ required: "Tags Are required" }}
                          render={({ field }) => (
                            <Select {...field} options={AmenitiesData} styles={customStyles}
                              isMulti
                              className={`select-custom pl-0 ${errors.tag ? "is-invalid" : ""}`}
                              classNamePrefix="select"
                            />
                          )}
                        />
                        {errors.tag && <p className="text-danger">{errors.tag.message}</p>}

                      </div>
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb30">
                      <label className="heading-color ff-heading fw600 mb10">
                        No BedRoom
                      </label>
                      <input
                        type="number"
                        {...register("bedroom", { required: "Number Of BedRoom is required" })}
                        className={`form-control ${errors.bedroom ? "is-invalid" : ""}`}
                        placeholder="Number Of BedRoom"
                      />
                      {errors.bedroom && <p className="text-danger">{errors.bedroom.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb30">
                      <label className="heading-color ff-heading fw600 mb10">
                        No Bathroom
                      </label>
                      <input
                        type="number"
                        {...register("bathroom", { required: "Number Of Bathroom is required" })}
                        className={`form-control ${errors.bathroom ? "is-invalid" : ""}`}
                        placeholder="Number Of Bathroom"
                      />
                      {errors.bathroom && <p className="text-danger">{errors.bathroom.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb30">
                      <label className="heading-color ff-heading fw600 mb10">
                        Square Feet
                      </label>
                      <input
                        type="number"
                        {...register("square", { required: "Square Feet is required" })}
                        className={`form-control ${errors.square ? "is-invalid" : ""}`}
                        placeholder="Square Feet"
                      />
                      {errors.square && <p className="text-danger">{errors.square.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb30">
                      <label className="heading-color ff-heading fw600 mb10">
                        Year Building
                      </label>
                      <input
                        type="number"
                        {...register("yearbuilding", { required: "Year Building is required" })}
                        className={`form-control ${errors.yearbuilding ? "is-invalid" : ""}`}
                        placeholder="Year Building"
                      />
                      {errors.yearbuilding && <p className="text-danger">{errors.yearbuilding.message}</p>}
                    </div>
                  </div>
                  {/* End .col-6 */}

                </div>


                <div className="ps-widget bgc-white bdrs12 py30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Upload photos of your property</h4>
                  <form className="form-style1">
                    <div className="row">
                      <div className="col-lg-12">
                        <div
                          className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                        >
                          <div className="icon mb30">
                            <span className="flaticon-upload" />
                          </div>
                          <h4 className="title fz17 mb10">Upload/Drag photos of your property</h4>
                          <p className="text mb25">
                            Photos must be JPEG or PNG format and at least 2048x768
                          </p>
                          <label className="ud-btn btn-white">
                            Browse Files
                            <input
                              ref={fileInputRef}
                              id="fileInput"
                              type="file"
                              multiple
                              className="ud-btn btn-white"
                              onChange={(e) => handleUpload(e.target.files)}
                              style={{ display: "none" }}
                            />
                          </label>
                          {imageError && <p className="text-danger">{imageError}</p>}
                        </div>

                        {/* Display uploaded images */}
                        <div className="row profile-box position-relative d-md-flex align-items-end mb50">
                          {uploadedImages.map((imageData, index) => (
                            <div className="col-lg-2 col-md-3 col-6" key={index}>
                              <div className="profile-img mb20 position-relative">
                                <Image
                                  width={212}
                                  height={194}
                                  className="w-100 bdrs12 cover"
                                  src={imageData}
                                  alt={`Uploaded Image ${index + 1}`}
                                />
                                <button
                                  style={{ border: "none" }}
                                  className="tag-del"
                                  title="Delete Image"
                                  onClick={() => handleDelete(index)}
                                  type="button"
                                  data-tooltip-id={`delete-${index}`}
                                >
                                  <span className="fas fa-trash-can" />
                                </button>

                                <ReactTooltip
                                  id={`delete-${index}`}
                                  place="right"
                                  content="Delete Image"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* End col-12 */}

                    {/* End .row */}
                  </form>
                </div>
                {/* End .col-12 */}


              </div>
              {/* Submit Button */}
              <div className="col-12 mt-4">
                <button type="submit" className="ud-btn btn-white">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div>



          </div>
        </div>
        {/* End tab for Property Description */}

      </div>
    </div>
  );
};

export default AddPropertyTabContentCustomer;
