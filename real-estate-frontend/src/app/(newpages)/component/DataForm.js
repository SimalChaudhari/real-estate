"use client";
import React from "react";
import { useForm } from "react-hook-form";

const DataForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    console.log("Form Submitted Data:", data);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-dark text-white d-flex justify-content-between">
          <h4 className="mb-0 title text-white">Enquiry Details</h4>
        </div>
        <div className="card-body m-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">First Name</label>
                  <input
                    type="text"
                    {...register("firstName", { required: "First Name is required" })}
                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                    placeholder="First Name"
                  />
                  {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName", { required: "Last Name is required" })}
                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    placeholder="Last Name"
                  />
                  {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">Phone / Mobile</label>
                  <input
                    type="number"
                    {...register("mobile", { required: "Phone OR Mobile is required" })}
                    className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                    placeholder="Phone / Mobile"
                  />
                  {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
                </div>
              </div>

              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">Address</label>
                  <textarea
                    cols={30}
                    rows={4}
                    placeholder="There are many variations of passages."
                    {...register("address", { required: "Address is required" })}
                    className={`form-control py-2 ${errors.address ? "is-invalid" : ""}`}
                  />
                  {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div>
              </div>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="text-center mt-4 d-flex flex-column flex-md-row justify-content-center gap-2">
              <button type="submit" className="ud-btn btn-white w-sm-auto me-md-2">
                Submit
              </button>
              <button type="reset" className="ud-btn btn-white w-sm-auto mt-2 mt-md-0 bg-dark text-white">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
