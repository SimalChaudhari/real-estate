"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createProperty } from "@/redux/actions/propertyActions";
import { useRouter } from "next/navigation";

const PropertyCreateForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
    rent_price: Yup.number().nullable().min(0, "Invalid rent price"),
    sale_price: Yup.number().nullable().min(0, "Invalid sale price"),
    street_address: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip code is required"),
    lat: Yup.number().nullable(),
    long: Yup.number().nullable(),
    bed: Yup.number().nullable(),
    bath: Yup.number().nullable(),
    sqft: Yup.number().nullable(),
    propertyType: Yup.string().required("Property type is required"),
    yearBuilding: Yup.number().nullable(),
  });

  const initialValues = {
    title: "",
    description: "",
    status: "Available",
    rent_price: null,
    sale_price: null,
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    lat: null,
    long: null,
    bed: null,
    bath: null,
    sqft: null,
    propertyType: "",
    yearBuilding: null,
    tags: [],
    features: [],
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const success = await dispatch(createProperty(values));
    if (success) {
      router.push("/properties");
      resetForm();
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form-style1">
          <div className="row m20">
            <div className="col-sm-6">
              <label>Title</label>
              <Field type="text" name="title" className="form-control" />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>
            <div className="col-sm-6">
              <label>Status</label>
              <Field as="select" name="status" className="form-control">
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-danger" />
            </div>
            <div className="col-sm-6">
              <label>Rent Price</label>
              <Field type="number" name="rent_price" className="form-control" />
              <ErrorMessage name="rent_price" component="div" className="text-danger" />
            </div>
            <div className="col-sm-6">
              <label>Sale Price</label>
              <Field type="number" name="sale_price" className="form-control" />
              <ErrorMessage name="sale_price" component="div" className="text-danger" />
            </div>
            {/* Add fields for address, features, etc., here */}
          </div>
          <button type="submit" disabled={isSubmitting} className="btn btn-dark">
            {isSubmitting ? "Submitting..." : "Create Property"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyCreateForm;
