import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import PropertyFilteringList from "@/components/listing/list-view/list-v1/PropertyFilteringList";
import AddPropertyTabContent from "@/components/property/dashboard/dashboard-add-property";

import React from "react";
import AddPropertyTabContentCustomer from "./(add-property-component)/dashboard-add-property";

export const metadata = {
  title: "List V1 || Homez - Real Estate NextJS Template",
};

const AddProperty = () => {
  return (
    <div>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2>Add New Property</h2>
                <p className="text">We are glad to see you again!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Start Add New Property */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                <div className="navtab-style1">
                  <AddPropertyTabContentCustomer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Add New Property */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </div>
  );
};

export default AddProperty;
