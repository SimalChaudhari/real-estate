"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const UploadPhotoGallery = ({ data = [], onUpdate }) => {
  const [uploadedImages, setUploadedImages] = useState(data);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUploadedImages(data); // Initialize with parent-provided data
  }, [data]);

  const handleUpload = (files) => {
    const newImages = [...uploadedImages];

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        setUploadedImages(newImages);
        onUpdate(newImages); // Notify parent of changes
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the hidden file input
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    onUpdate(newImages); // Notify parent of changes
  };

  return (
    <>
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="icon mb30">
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10">Upload/Drag photos of your property</h4>
        <p className="text mb25">
          Photos must be JPEG or PNG format and at least 2048x768
        </p>
        <button
          type="button"
          className="ud-btn btn-white"
          onClick={handleButtonClick}
        >
          Browse Files
        </button>
        <input
          ref={fileInputRef}
          id="fileInput"
          type="file"
          multiple
          accept="image/jpeg, image/png"
          className="d-none"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Display uploaded images */}
      <div className="row profile-box position-relative d-md-flex align-items-end mb50">
        {uploadedImages.map((imageData, index) => (
          <div className="col-2" key={index}>
            <div className="profile-img mb20 position-relative">
              <Image
                width={212}
                height={194}
                className="w-100 bdrs12 cover"
                src={imageData}
                alt={`Uploaded Image ${index + 1}`}
              />
              <button
                style={{ border: "none" }}
                className="tag-del"
                title="Delete Image"
                onClick={() => handleDelete(index)}
                type="button"
                data-tooltip-id={`delete-${index}`}
              >
                <span className="fas fa-trash-can" />
              </button>
              <ReactTooltip
                id={`delete-${index}`}
                place="right"
                content="Delete Image"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadPhotoGallery;
