import DefaultHeader from "@/components/common/DefaultHeader";

import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringTwo from "@/components/listing/map-style/map-v1/PropertyFilteringTwo";

import React from "react";

export const metadata = {
  title: "Map V1 || Homez - Real Estate NextJS Template",
};

const MapV1 = () => {
  return (
    <div>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
      <PropertyFilteringTwo/>

      {/* <!-- Advance Feature Modal Start --> */}
     
      {/* Property Filtering */}
    </div>
  );
};

export default MapV1;
