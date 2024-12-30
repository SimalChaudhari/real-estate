"use client";
import { useFetchLocationData } from "@/app/api/fetch-location";
import { fetchLocationFailure, fetchLocationsStart, fetchLocationsSuccess } from "@/app/features/locationsSlice";
import { GetLocationList } from "@/services/listing/locationApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const RequirementPropertyTabContentCustomer = () => {

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });


    const dispatch = useDispatch();


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

    // const citiesOptions = location?.cities?.map((city) => ({
    //     value: city.id,
    //     label: city.name,
    // })) || [];
    
    const citiesOptions = location
        ?.map((state) =>
            state.cities.map((city) => ({
                id: city._id, // Include `_id` for uniqueness
                value: city.name,
                label: city.name,
            }))
        )
        .flat() // Flatten the array
        .filter((city, index, self) =>
            index === self.findIndex((c) => c.id === city.id) // Keep only unique `_id`
        ) || [];

    // Extract unique states
    const statessOptions = location?.reduce((uniqueStates, state) => {
        if (!uniqueStates.some((unique) => unique.value === state._id)) {
            uniqueStates.push({
                value: state.name,
                label: state.name,
            });
        }
        return uniqueStates;
    }, []) || [];

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
        { value: "Buy", label: "Buy" },
        { value: "Rent", label: "Rent" },
        { value: "Sold", label: "Sold" },
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

    const handleFormSubmit = (data) => {
        // console.log("Form Data Submitted:", {
        //     ...data
        // });
        const formattedData = {
            title: data.title,
            description: data.description,
            price: data.budget,
            bedrooms: data.bedroom,
            bathrooms: data.bathroom,
            tags: data.tag?.map((tag) => tag.value) || [],
            uploadedImages: data.uploadedImages?.map((file) => file) || [],
            city: data.city?.value || "",
            state: data.state?.value || "",
            latitude: data.latitude,
            longitude: data.longiTude,
            yearBuilding: data.yearbuilding,
        };

        console.log("Formatted Data:", formattedData);
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
                        <h4 className="title fz17 mb30">Requirement Details</h4>
                        {/*
                            <PropertyDescription />
                        */}
                        <form className="form-style1" onSubmit={handleSubmit(handleFormSubmit)}>
                            <div >

                                <div className="row">

                                    <div className="col-sm-6 col-xl-4">
                                        <div className="mb20">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                Requirement Type
                                            </label>
                                            <div className="location-area">
                                                <Controller
                                                    name="listedIn"
                                                    control={control}
                                                    rules={{ required: "Requirement Type is required" }}
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
                                        <div className="mb20">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                Property Category
                                            </label>
                                            <div className="location-area">
                                                <Controller
                                                    name="category"
                                                    control={control}
                                                    rules={{ required: "Property Category is required" }}
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
                                            <label className="heading-color ff-heading fw600 mb10">Property Type</label>
                                            <input
                                                type="text"
                                                {...register("title", { required: "Property Type is required" })}
                                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                                placeholder="Property Type"
                                            />
                                            {errors.title && <p className="text-danger">{errors.title.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-12 */}

                                    <div className="col-sm-6 col-xl-4">
                                        <div className="mb30">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                Budget  ₹
                                            </label>
                                            <input
                                                type="number" {...register("budget", {
                                                    required: "Budget is required",
                                                    min: { value: 1, message: "Price must be greater than 0" },
                                                })}
                                                className={`form-control ${errors.budget ? "is-invalid" : ""}`}
                                                placeholder="Your Name"
                                            />
                                            {errors.budget && <p className="text-danger">{errors.budget.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-6 */}

                                    <div className="col-sm-6 col-xl-4">
                                        <div className="mb30">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                Area
                                            </label>
                                            <input
                                                type="text"
                                                {...register("area", { required: "Area is required" })}
                                                className={`form-control ${errors.area ? "is-invalid" : ""}`}
                                                placeholder="Area"
                                            />
                                            {errors.area && <p className="text-danger">{errors.area.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-6 */}

                                    <div className="col-sm-6 col-xl-4">
                                        <div className="mb20">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                Brief Description
                                            </label>
                                            <textarea
                                                // cols={30}
                                                // rows={5}
                                                rows={1}
                                                placeholder="There are many variations of passages."
                                                {...register("description", { required: "Description is required" })}
                                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                                defaultValue={""}
                                            />
                                            {errors.description && <p className="text-danger">{errors.description.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-6 */}

                                </div>

                                <hr />
                                <h4 className="title fz17 mb30">Property Location</h4>

                                <div className="row">

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
                                                        <Select {...field} options={citiesOptions} styles={customStyles}

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
                                        <div className="mb30">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                Latitude
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
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
                                                step="any"
                                                {...register("longiTude", { required: "Latitude is required" })}
                                                className={`form-control ${errors.longiTude ? "is-invalid" : ""}`}
                                                placeholder="LongiTude"
                                            />
                                            {errors.longiTude && <p className="text-danger">{errors.longiTude.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-6 */}

                                </div>

                                <hr />
                                <h4 className="title fz17 mb30">Your Contact Details</h4>

                                <div className="row">

                                    <div className="col-sm-6 col-xl-4">
                                        <div className="mb30">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register("firstName", { required: "First Name is required" })}
                                                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                                placeholder="First Name"
                                            />
                                            {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-6 */}

                                    <div className="col-sm-6 col-xl-4">
                                        <div className="mb30">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register("lastName", { required: "Last Name is required" })}
                                                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                                placeholder="Last Name"
                                            />
                                            {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-6 */}

                                    <div className="col-sm-6 col-xl-4">
                                        <div className="mb20">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                Address
                                            </label>
                                            <textarea
                                                // cols={30}
                                                // rows={5}
                                                rows={1}
                                                placeholder="There are many variations of passages."
                                                {...register("address", { required: "Address is required" })}
                                                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                                defaultValue={""}
                                            />
                                            {errors.address && <p className="text-danger">{errors.address.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-6 */}

                                    <div className="col-sm-6 col-xl-4">
                                        <div className="mb30">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                City / State
                                            </label>
                                            <input
                                                type="text"
                                                {...register("city_state", { required: "City - State required" })}
                                                className={`form-control ${errors.city_state ? "is-invalid" : ""}`}
                                                placeholder="City / State"
                                            />
                                            {errors.city_state && <p className="text-danger">{errors.city_state.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-6 */}

                                    <div className="col-sm-6 col-xl-4">
                                        <div className="mb30">
                                            <label className="heading-color ff-heading fw600 mb10">
                                                Phone / Mobile
                                            </label>
                                            <input
                                                type="number"
                                                {...register("mobile", { required: "Phone OR Mobile is required" })}
                                                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                                                placeholder="Phone / Mobile"
                                            />
                                            {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
                                        </div>
                                    </div>
                                    {/* End .col-6 */}

                                </div>

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

export default RequirementPropertyTabContentCustomer;
