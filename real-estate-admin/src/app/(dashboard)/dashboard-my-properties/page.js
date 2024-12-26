"use client"
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import PropertyDataTable from "@/components/property/dashboard/dashboard-my-properties/PropertyDataTable";
import { useRouter } from "next/navigation";


const DashboardMyProperties = () => {

  const router = useRouter();

  const navigateToNewUser = () => {
    router.push("/dashboard-add-property");
  };
  return (
    <div>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
          <div className="dashboard__content bgc-f7">
            <div className="row">
              <div className="col-xl-12">
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
        
                  <div className="d-flex justify-content-end pb10 mb10">
                  <div className="d-flex justify-content-end pb10 mb10">
                  <button 
                    className="btn btn-warning d-flex align-items-center ud-btn btn-dark" 
                    style={{ backgroundColor: "black", color: "white", border: "none" }}
                    onClick={navigateToNewUser}
                  >
                  Create
                  <i className="fal fa-arrow-right-long" />
                </button>
                </div>
                
                  </div>
        
                  <div className="packages_table table-responsive">
                    <PropertyDataTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </div>
  );
};

export default DashboardMyProperties;
