"use client";
import { authLogin } from "@/BackendApi/Auth/AuthApi";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/app/features/authSlice";
import { toast } from 'react-toastify';

const SignIn = () => {
  const dispatch = useDispatch(); // Use dispatch from react-redux

  // Access Redux store data using useSelector
  const authState = useSelector((state) => state.auth); // Assuming the auth slice is named "auth"

  // Log Redux state
  React.useEffect(() => {
    console.log("Redux Auth State Updated:", authState); // Log the updated state
  }, [authState]);

  // State to store user input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to handle errors and loading
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
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
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      fieldErrors.email = "Enter a valid email address.";
    }
    if (!formData.password || formData.password.length < 2) {
      fieldErrors.password = "Password must be at least 2 characters.";
    }
    return fieldErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setLoading(true);

    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await authLogin(formData); // Call the API with the form data

      // Dispatch the loginSuccess action to store the user and token in Redux
      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );
      
      // Save token and user data if needed
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success("Reset Password Successfull!");

      // Redirect user or perform additional actions
      // alert("Login successful!");
      setSuccess(true);
    } catch (error) {
      toast.error("Reset Password failed. Please try again.");
      console.error("Error during login:", error.message);
      setErrors({ apiError: error.message || "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
    {success && (
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Login Successful!</strong> Welcome back.
        <button
          type="button"
          className="btn-close m-2"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => setSuccess(false)} // Close alert
        ></button>
      </div>
    )}
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
      {/* End email */}

      <div className="mb15">
        <label className={`form-label fw600 ${errors.password ? "text-danger" : "dark-color"}`}>Password</label>
        <input
          type="password"
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


      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
        <a className="fz14 ff-heading" href="#">
          Lost your password?
        </a>
      </div>
      {/* End  Lost your password? */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          Sign in <i className="fal fa-arrow-right-long" />
        </button>
      </div>
      {/* End submit */}

      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue Google
        </button>
      </div>
      <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div>
      <p className="dark-color text-center mb0 mt10">
        Not signed up?{" "}
        <Link className="dark-color fw600" href="/register">
          Create an account.
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
