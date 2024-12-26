"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useFetchData } from "./fetch-data";
import { useSelector } from 'react-redux';
import Pagination from "../../Pagination";

const propertyData = [
  {
    id: 1,
    title: "Equestrian Family Home",
    imageSrc: "/images/listings/list-1.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Pending",
  },
  {
    id: 2,
    title: "Luxury villa in Rego Park",
    imageSrc: "/images/listings/list-2.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Published",
  },
  {
    id: 3,
    title: "Villa on Hollywood Boulevard",
    imageSrc: "/images/listings/list-3.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Processing",
  },
  {
    id: 4,
    title: "Equestrian Family Home",
    imageSrc: "/images/listings/list-4.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Pending",
  },
  {
    id: 5,
    title: "Luxury villa in Rego Park",
    imageSrc: "/images/listings/list-5.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Published",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "pending-style style1";
    case "Published":
      return "pending-style style2";
    case "Processing":
      return "pending-style style3";
    default:
      return "";
  }
};

const PropertyDataTable = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Adjust items per page as needed
  const { fetchData, fetchDeleteData } = useFetchData()

  const propertyData = useSelector((state) => state.property?.propertyData || []);

  const totalItems = propertyData.length // Total user count from Redux

  const [showDialog, setShowDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);


  useEffect(() => {
    fetchData()
  }, []); // Empty dependency array ensures it runs only once

  // Calculate users for the current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const current = propertyData.slice(indexOfFirst, indexOfLast);

  const handleDeleteClick = (data) => {
    setSelectedProperty(data);
    setShowDialog(true);
  };

  const confirmDelete = () => {
    // set propertyData(propertyData.filter((user) => user._id !== selectedProperty._id));
    fetchDeleteData(selectedProperty)
    setShowDialog(false);
    setSelectedProperty(null);
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setSelectedProperty(null);
  };

  return (

    <div>
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <h4>Are you sure?</h4>
            <h6>Do you really want to delete {selectedProperty?.firstName}?</h6>
            <div className="dialog-actions">
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="table-style3 table at-savesearch">
        <thead className="t-head">
          <tr>
            <th scope="col">Listing title</th>
            <th scope="col">Property Type</th>
            <th scope="col">Date Published</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="t-body">
          {propertyData.map((property) => (
            <tr key={property._id}>
              <th scope="row">
                <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                  <div className="list-thumb">
                    <Image
                      width={110}
                      height={94}
                      className="w-100"
                      src={property.images?.[0]}
                      alt="property"
                    />
                  </div>
                  <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                    <div className="h6 list-title">
                      <Link href={`/single-v1/${property.id}`}>{property.title}</Link>
                    </div>
                    <p className="list-text mb-0">{property.address.city}</p>
                    <div className="list-price">
                      <a href="#">{property.sale}</a>
                    </div>
                  </div>
                </div>
              </th>
              <td className="vam">{property.propertyType}</td>
              <td className="vam">{property.availability.start_date}</td>
              <td className="vam">
                <span className={getStatusStyle(property.status)}>
                  {property.status}
                </span>
              </td>
             
              <td className="vam">
                <div className="d-flex">
                  <button
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`edit-${property._id}`}
                  >
                    <Link href={`/dashboard-my-property-update/${property._id}`}><span className="fas fa-pen fa" /></Link>
                  </button>

                  <button
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`view-${property._id}`}
                  >
                    <Link href={`/dashboard-view-property/${property._id}`}>
                      <span className="fas fa-eye fa" />
                    </Link>
                  </button>

                  <button
                    onClick={() => handleDeleteClick(property._id)}
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`delete-${property._id}`}
                  >
                    <span className="flaticon-bin" />
                  </button>

                  <ReactTooltip
                    id={`edit-${property.id}`}
                    place="top"
                    content="Edit"
                  />

                  <ReactTooltip
                    id={`view-${property._id}`}
                    place="top"
                    content="View"
                  />
                  <ReactTooltip
                    id={`delete-${property._id}`}
                    place="top"
                    content="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt30">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <style jsx>{`
        .confirmation-dialog {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .dialog-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .dialog-actions {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }
        .btn {
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
        .btn-danger {
          background-color: red;
          color: white;
        }
        .btn-secondary {
          background-color: gray;
          color: white;
        }
      `}</style>
    </div>

  );
};
export default PropertyDataTable;
