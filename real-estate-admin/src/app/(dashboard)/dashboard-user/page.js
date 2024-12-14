"use client"

import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/property/Pagination";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import UserDataTable from "@/components/property/dashboard/dashboard-user/UserDataTable";
import { useRouter } from "next/navigation";


const DashboardUser = () => {

  const router = useRouter();

  const navigateToNewUser = () => {
    router.push("/dashboard-user-create");
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
                    className="btn btn-warning d-flex align-items-center" 
                    style={{ backgroundColor: "black", color: "white", border: "none" }}
                    onClick={navigateToNewUser}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="30" 
                      height="30" 
                      fill="currentColor" 
                      className="bi bi-plus me-2" 
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Add New
                  </button>
                </div>
                
                  </div>
        
                  <div className="packages_table table-responsive">
                    <UserDataTable />
                    <div className="mt30">
                      <Pagination />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
