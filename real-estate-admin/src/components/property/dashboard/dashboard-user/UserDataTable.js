"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useFetchData } from "./fetch-data";
import { useSelector } from 'react-redux';
import Pagination from "../../Pagination";

const getStatusStyle = (status) => {
  switch (status) {
    case "Active":
      return "pending-style style1";
    case "Inactive":
      return "pending-style style2";
    case "Processing":
      return "pending-style style3";
    default:
      return "";
  }
};


const UserDataTable = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Adjust items per page as needed
  const { fetchData, fetchDeleteData } = useFetchData()

  const userData = useSelector((state) => state.user?.userData || []);

  const totalItems = userData.length // Total user count from Redux

  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData()
  }, []); // Empty dependency array ensures it runs only once

    // Calculate users for the current page
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDialog(true);
  };

  const confirmDelete = () => {
    // setUserData(userData.filter((user) => user._id !== selectedUser._id));
    fetchDeleteData(selectedUser)
    setShowDialog(false);
    setSelectedUser(null);
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setSelectedUser(null);
  };

  return (

    <div>
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <h4>Are you sure?</h4>
            <h6>Do you really want to delete {selectedUser?.firstName}?</h6>
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
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Gender</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="t-body">
        {currentUsers.map((user) => (
            <tr key={user._id}>
              <th scope="row">
                <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                  <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                    <div className="h6 list-title">
                      <Link href={`/single-v1/${user._id}`}>{user.firstName}</Link>
                    </div>
                  </div>
                </div>
              </th>
              <td className="vam">{user.lastName}</td>
              <td className="vam">{user.email}</td>
              <td className="vam">{user.mobile}</td>
              <td className="vam">{user.gender}</td>

              <td className="vam">
                <span className={getStatusStyle(user.status)}>
                  {user.status}
                </span>
              </td>
              <td className="vam">
                <div className="d-flex">
                  <button
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`edit-${user._id}`}
                  >
                    <Link href={`/dashboard-user-update/${user._id}`}><span className="fas fa-pen fa" /></Link>
                  </button>

                  <button
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`view-${user._id}`}
                  >
                    <Link href={`/dashboard-user-view/${user._id}`}>
                      <span className="fas fa-eye fa" />
                    </Link>
                  </button>

                  <button
                    onClick={() => handleDeleteClick(user._id)}
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`delete-${user._id}`}
                  >
                    <span className="flaticon-bin" />
                  </button>

                  <ReactTooltip
                    id={`edit-${user.id}`}
                    place="top"
                    content="Edit"
                  />

                  <ReactTooltip
                    id={`view-${user._id}`}
                    place="top"
                    content="View"
                  />
                  <ReactTooltip
                    id={`delete-${user._id}`}
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

export default UserDataTable;
