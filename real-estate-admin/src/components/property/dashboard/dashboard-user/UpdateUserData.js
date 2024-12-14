"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editUser } from "@/redux/actions/userActions";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { useFetchData } from "./fetch-data";

const UserEditForm = ({ userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = useParams()

  const { fetchByData } = useFetchData()

  const user = useSelector((state) => state.user?.userByID || []);

  useEffect(() => {
    fetchByData(id)
  }, [])

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    mobile: Yup.number()
      .required("Mobile Number is required")
      .typeError("Mobile Number must be a valid number")
      .min(1000000000, "Mobile Number must be at least 10 digits")
      .max(9999999999999, "Mobile Number cannot exceed 13 digits"),
    gender: Yup.string().required("Gender is required"),
    status: Yup.string().required("Status is required"),
  });

  // Initial form values based on existing user data
  const initialValues = user
    ? {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      mobile: user.mobile || "",
      gender: user.gender || "",
      status: user.status || "Active",
    }
    : {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      gender: "",
      status: "Active",
    };

  const handleSubmit = async (values, { setSubmitting }) => {
    const success = await dispatch(editUser(id, values));
    if (success) {
      console.log("User updated successfully!");
      router.push("/dashboard-user");
    } else {
      console.log("Failed to update user.");
    }
    setSubmitting(false);
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form-style1">
          <div className="row m20">
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="Enter First Name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Enter Last Name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email Address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Mobile Number
                </label>
                <Field
                  type="text"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Gender
                </label>
                <Field as="select" name="gender" className="form-control">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Status
                </label>
                <Field as="select" name="status" className="form-control">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
          </div>

          <div className="row m20">
            <div className="col-sm-12 d-flex justify-content-end">
              <button
                type="submit"
                className="btn"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "16px",
                }}
              >
                {isSubmitting ? "Updating..." : "Update User"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserEditForm;
