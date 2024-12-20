"use client";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Image from "next/image";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationFailure, fetchLocationsStart, fetchLocationsSuccess } from "@/app/features/locationsSlice";
import { GetLocationList } from "@/services/listing/locationApi";
import { CreateProperty } from "@/services/listing/listingApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useFetchLocationData } from "@/app/api/fetch-location";

const AddPropertyTabContentCustomer = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImagesForData, setUploadedImagesForData] = useState([]);
  const [imageError, setImageError] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // Fetch token from cookies
  const token = Cookies.get("token");

  useEffect(() => {
    // Fetch locations on component mount
    const fetchLocations = async () => {
      dispatch(fetchLocationsStart());
      const response = await GetLocationList();
      if (response.success) {
        dispatch(fetchLocationsSuccess(response.data));
      } else {
        dispatch(fetchLocationFailure(response.message));
      }
    };
    fetchLocations();
  }, [dispatch]);

  
    const { fetchLocationData } = useFetchLocationData()
  
    useEffect(() => {
      fetchLocationData()
    }, [])
  

  const { location, loading } = useSelector((state) => state.location);

  // Extracting city data dynamically from the Redux store
  // const citiesOptions = location?.cities?.map((city) => ({
  //   value: city.id,
  //   label: city.name,
  // })) || [];

  // Extracting city data dynamically from the Redux store
  const statessOptions = location?.cities
    ?.reduce((uniqueStates, city) => {
      if (!uniqueStates.some((state) => state.value === city.stateId._id)) {
        uniqueStates.push({
          value: city.stateId._id, // Ensure unique identifier
          label: city.stateId.name, // State name
        });
      }
      return uniqueStates;
    }, []) || [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset, // Include reset here
  } = useForm({ mode: "onSubmit" });


  // Watch state selection
  const selectedState = watch("state");

  useEffect(() => {
    // Filter cities based on selected state
    if (selectedState) {
      const cities = location?.cities?.filter(
        (city) => city.stateId._id === selectedState.value
      );
      const citiesOptions = cities.map((city) => ({
        value: city.id,
        label: city.name,
      }));
      setFilteredCities(citiesOptions);
    } else {
      setFilteredCities([]);
    }
  }, [selectedState, location]);

  const categoryOptions = [
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Loft", label: "Loft" },
    { value: "Office", label: "Office" },
    { value: "Townhome", label: "Townhome" },
    { value: "Villa", label: "Villa" },
  ];
  const tagsOptions = [
    { value: "apartments", label: "apartments" },
    { value: "bungalow", label: "bungalow" },
    { value: "houses", label: "houses" },
    { value: "loft", label: "loft" },
    { value: "office", label: "office" },
    { value: "townhome", label: "townhome" },
    { value: "villa", label: "villa" },
  ];
  const listedIn = [
    { value: "Buy", label: "Buy" },
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
    const newImages = [];

    const newImagesView = [...uploadedImages];

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImagesView.push(e.target.result);
        setUploadedImages(newImagesView);
      };
      reader.readAsDataURL(file);
    }

    for (const file of files) {
      if (!validFormats.includes(file.type)) {
        setImageError("Only JPEG and PNG formats are allowed.");
        continue;
      }
      // Store only the File object
      newImages.push(file);
    }
    setUploadedImagesForData((prevImages) => [...prevImages, ...newImages]);
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
    const newImages = [...uploadedImagesForData];
    newImages.splice(index, 1);
    setUploadedImagesForData(newImages);

    const newImagesView = [...uploadedImages];
    newImagesView.splice(index, 1);
    setUploadedImages(newImagesView);
  };

  const handleFormSubmit = async (data) => {
    if (uploadedImagesForData.length === 0) {
      setImageError("At least one image is required.");
      return;
    }
    // Ensure start_date is properly formatted
    const currentDate = new Date("2024-01-01T00:00:00.000Z");
    const formattedDate = currentDate.toISOString(); // Converts to 'YYYY-MM-DDTHH:mm:ss.sssZ'


    const formData = new FormData();

    // Convert uploaded images to base64 or pass File objects directly
    uploadedImagesForData.forEach((file) => {
      formData.append("images", file); // Append File objects
    });

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", "Buy");
    formData.append("rent_price", data.price);
    formData.append("sale_price", data.price);
    formData.append("street_address", data.address);
    formData.append("city", data.city?.value || "");
    formData.append("state", data.state?.value || "");
    formData.append("zip_code", data.zipcode || "");
    formData.append("lat", Number(data.latitude)); // Convert to number
    formData.append("long", Number(data.longiTude)); // Convert to number
    formData.append("bed", Number(data.bedroom)); // Convert to number
    formData.append("bath", Number(data.bathroom)); // Convert to number
    formData.append("sqft", Number(data.square)); // Convert to number
    formData.append("propertyType", data.category?.value);
    formData.append("yearBuilding", Number(data.yearbuilding)); // Convert to number
    formData.append("forRent", true);
    formData.append("featured", true);
    formData.append("start_date", formattedDate);
    // formData.append("images", JSON.stringify(dummyImages));

    // Append features individually
    data.features?.forEach((feature) => {
      formData.append("features", feature.value);
    });

    // Append tags individually
    data.tags?.forEach((tag) => {
      formData.append("tags", tag.value);
    });


    if (!token) {
      toast.error("Please log in to upload property.");
      return;
    }

    try {
      const response = await dispatch(CreateProperty(formData));

      if (response.success) {
        toast.success(response.message);

        reset(); // Clear all fields in the form
        setUploadedImages([]); // Clear uploaded image previews
        setUploadedImagesForData([]); // Clear uploaded image data
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
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
                        States
                      </label>
                      <div className="location-area">
                        <Controller
                          name="state"
                          control={control}
                          rules={{ required: "State is required" }}
                          render={({ field }) => (
                            <Select {...field} options={statessOptions} styles={customStyles}

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
                            <Select {...field} options={filteredCities} styles={customStyles}

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
                        Features
                      </label>
                      <div className="location-area">

                        <Controller
                          name="features"
                          control={control}
                          rules={{ required: "Features Are required" }}
                          render={({ field }) => (
                            <Select {...field} options={AmenitiesData} styles={customStyles}
                              isMulti
                              className={`select-custom pl-0 ${errors.features ? "is-invalid" : ""}`}
                              classNamePrefix="select"
                            />
                          )}
                        />
                        {errors.features && <p className="text-danger">{errors.features.message}</p>}

                      </div>
                    </div>
                  </div>
                  {/* End .col-6 */}

                  <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">
                        Tags
                      </label>
                      <div className="location-area">

                        <Controller
                          name="tags"
                          control={control}
                          rules={{ required: "Tags Are required" }}
                          render={({ field }) => (
                            <Select {...field} options={tagsOptions} styles={customStyles}
                              isMulti
                              className={`select-custom pl-0 ${errors.tags ? "is-invalid" : ""}`}
                              classNamePrefix="select"
                            />
                          )}
                        />
                        {errors.tags && <p className="text-danger">{errors.tags.message}</p>}

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
                                  className="features-del"
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
