"use client"; // Mark this as a client component
import React, { useState } from "react";
import Link from "next/link";
import { authRegister } from "@/BackendApi/Auth/AuthApi";
import { toast } from 'react-toastify';

import { useRouter } from "next/navigation";
const SignUp = () => {
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes and clear field-specific errors
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear the error for the current field
  };

  // Validate individual fields
  const validateFields = () => {
    const fieldErrors = {};
    if (!formData.firstName.trim()) fieldErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) fieldErrors.lastName = "Last name is required.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      fieldErrors.email = "Enter a valid email address.";
    }
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      fieldErrors.mobile = "Phone number must be 10 digits.";
    }
    if (!formData.password || formData.password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.gender) fieldErrors.gender = "Gender is required.";
    return fieldErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setLoading(true);

    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await authRegister(formData); // Call the API with form data
      setSuccess("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        gender: "",
      }); // Reset form
      toast.success("Registration Successfull!");
      router.push('/');
    } catch (error) {
      toast.error(error.message || "Registration Failed. Please Try Again.");
      console.error("Error during registration:", error.message);
      setErrors({ apiError: error.message || "An error occurred during registration." });
    } finally {
      setLoading(false);
    }
  };




  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="row">
        {/*<div className="col-lg-6 col-md-6"> */}
        <div className="col-lg-12 col-md-6 ">
          <div className="mb25">

            <label className={`form-label fw600 ${errors.firstName ? "text-danger" : "dark-color"}`}>First Name *</label>
            <input
              type="text"
              name="firstName"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            // required
            />
            {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
          </div>
          {/* End First Name */}

        </div>
        {/*<div className="col-lg-6 col-md-6"> */}
        <div className="col-lg-12 col-md-6 ">
          <div className="mb25">
            <label className={`form-label fw600 ${errors.lastName ? "text-danger" : "dark-color"}`}>Last Name</label>
            <input
              type="text"
              name="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            // required
            />
            {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
          </div>
          {/* End Last Name */}
        </div>
      </div>

      <div className="row">
        {/*<div className="col-lg-6 col-md-6"> */}
        <div className="col-lg-12 col-md-6 ">
          <div className="mb25">
            <label className={`form-label fw600 ${errors.email ? "text-danger" : "dark-color"}`}>Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
            // required
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          {/* End Email */}
        </div>
        {/*<div className="col-lg-6 col-md-6"> */}
        <div className="col-lg-12 col-md-6 ">
          <div className="mb25">
            <label className={`form-label fw600 ${errors.mobile ? "text-danger" : "dark-color"}`}>Mobile</label>
            <input
              type="text"
              name="mobile"
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
            // required
            />
            {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
          </div>
          {/* End Mobile */}
        </div>
      </div>

      <div className="row">
        {/*<div className="col-lg-6 col-md-6"> */}
        <div className="col-lg-12 col-md-6 ">
          <div className="mb25">
            <label className={`form-label fw600 ${errors.gender ? "text-danger" : "dark-color"}`}>Gender</label>
            <select
              name="gender"
              className={`form-control ${errors.gender ? "is-invalid" : ""}`}
              value={formData.gender}
              onChange={handleInputChange}
            // required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <small className="text-danger">{errors.gender}</small>}
          </div>
          {/* End Gender */}
        </div>
        {/*<div className="col-lg-6 col-md-6"> */}
        <div className="col-lg-12 col-md-6 ">
          <div className="mb20">
            <label className={`form-label fw600 ${errors.password ? "text-danger" : "dark-color"}`}>Password</label>
            <input
              type="text"
              name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
            // required
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          {/* End Password */}
        </div>
      </div>







      {/*
        <div className="d-grid mb20 col-lg-4">
        */}
      <div className="d-grid mb20 col-lg-12">
        <button className="ud-btn btn-thm"
          type="submit"
          data-bs-dismiss={success ? "modal" : undefined} // Dismiss modal only on success
          aria-label={success ? "Close" : undefined} // Add aria-label when modal can be dismissed
          disabled={loading}
        >
        {loading ? "Loading..." : "Create account"} <i className="fal fa-arrow-right-long" />
        </button>
      </div>
      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="row">
        {/*<div className="d-grid mb10 col-lg-4">*/}
        <div className="d-grid mb10 col-lg-12">
          <button className="ud-btn btn-white" type="button">
            <i className="fab fa-google" /> Continue Google
          </button>
        </div>
        {/*<div className="d-grid mb10 col-lg-4">*/}
        <div className="d-grid mb10 col-lg-12">
          <button className="ud-btn btn-fb" type="button">
            <i className="fab fa-facebook-f" /> Continue Facebook
          </button>
        </div>
        {/*<div className="d-grid mb20 col-lg-4">*/}
        <div className="d-grid mb20 col-lg-12">
          <button className="ud-btn btn-apple" type="button">
            <i className="fab fa-apple" /> Continue Apple
          </button>
        </div>
      </div>
      {/*
        */}
        <p className="dark-color text-center mb0 mt10 mobile-menu">
          Already Have an Account?{" "}
          <Link className="dark-color fw600" href="/login">
            Login
          </Link>
        </p>
    </form>
  );
};

export default SignUp;
