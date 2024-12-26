"use client"

import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import OverView from "@/components/property/dashboard/dashboard-my-properties/OverView";
import PropertyAddress from "@/components/property/dashboard/dashboard-my-properties/PropertyAddress";
import PropertyDetails from "@/components/property/dashboard/dashboard-my-properties/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/dashboard/dashboard-my-properties/PropertyFeaturesAminites";
import PropertyGallery from "@/components/property/dashboard/dashboard-my-properties/PropertyGallery";
import PropertyHeader from "@/components/property/dashboard/dashboard-my-properties/PropertyHeader";
import ProperytyDescriptions from "@/components/property/dashboard/dashboard-my-properties/ProperytyDescriptions";
import UserEditForm from "@/components/property/dashboard/dashboard-user/UpdateUserData";
import ViewUserData from "@/components/property/dashboard/dashboard-user/ViewUserData";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import { useParams } from 'next/navigation'

const DashboardUserView = () => {

  const { id } = useParams()


  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-md">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content property-page bgc-f7">
              <div className="row pb40 d-block d-lg-none">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="row">
                  <PropertyHeader id={id} />

                </div>
              </div>
              {/* End .row */}

              <div className="row wrap">
                <div className="col-lg-8">
                  <PropertyGallery id={id} />
                  
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Overview</h4>
                    <div className="row">
                      <OverView id={id} />
                    </div>
                  </div>
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Property Description</h4>
                    <ProperytyDescriptions id={id} />
                    {/* End property description */}

                    <h4 className="title fz17 mb30 mt50">Property Details</h4>
                    <div className="row">
                      <PropertyDetails id={id} />
                    </div>
                  </div>
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30 mt30">Address</h4>
                  <div className="row">
                    <PropertyAddress id={id} />
                  </div>
                </div>
                {/* End .ps-widget */}
  
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Features &amp; Amenities</h4>
                  <div className="row">
                    <PropertyFeaturesAminites id={id} />
                  </div>
                </div>

                </div>




                
              </div>
              {/* End .row */}
            </div>
            {/* End dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardUserView;
