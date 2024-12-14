"use client"
import React, { useEffect, useState } from "react";
import { useFetchData } from "./fetch-data";
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation'
const ViewUserData = () => {

    const { id } = useParams()

    const { fetchByData } = useFetchData()

    const user = useSelector((state) => state.user?.userByID || []);

    useEffect(() => {
        fetchByData(id)
    }, [])

    return (
        <div className="card-body">
            <div className="row">
                <div className="col-sm-6">
                    <p><strong>First Name:</strong> {user.firstName}</p>
                </div>
                <div className="col-sm-6">
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                </div>
                <div className="col-sm-6">
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="col-sm-6">
                    <p><strong>Mobile:</strong> {user.mobile}</p>
                </div>
                <div className="col-sm-6">
                    <p><strong>Gender:</strong> {user.gender}</p>
                </div>
                <div className="col-sm-6">
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
                <div className="col-sm-6">
                    <p><strong>Status:</strong> {user.status}</p>
                </div>
                <div className="col-sm-12">
                    <p><strong>Address:</strong> {user.address}</p>
                </div>
            </div>
        </div>

    );
};

export default ViewUserData;
