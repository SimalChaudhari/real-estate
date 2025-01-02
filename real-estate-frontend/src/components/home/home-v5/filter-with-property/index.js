"use client";
import React from "react";
import AdvanceFilterModal from "@/components/common/advance-filter";
import FilterContent from "./FilterContent";

const index = () => {
  return (
    <div>
      <div className="inner-banner-style1 text-center">
        <FilterContent />
      </div>

      {/* Advance Feature Modal */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSearchModal"
          tabIndex={-1}
          aria-labelledby="advanceSearchModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
    </div>
  );
};

export default index;