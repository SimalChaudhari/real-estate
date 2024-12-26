"use client";
import React, { useEffect, useState } from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";

const UploadMedia = ({ data = [], onUpdate }) => {
  const [images, setImages] = useState(data);

  useEffect(() => {
    setImages(data); // Initialize with parent-provided data
  }, [data]);

  const handleGalleryUpdate = (updatedImages) => {
    setImages(updatedImages); // Update local state
    onUpdate(updatedImages); // Notify parent of changes
  };

  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Upload photos</h4>
      <form className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery data={images} onUpdate={handleGalleryUpdate} />
          </div>
        </div>
        {/* End col-12 */}
      </form>
    </div>
  );
};

export default UploadMedia;
