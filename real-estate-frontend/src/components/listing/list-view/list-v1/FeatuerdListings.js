"use client";

import Image from "next/image";
import Link from "next/link";

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing) => (
        <div
          className={` ${colstyle ? "col-sm-6 col-lg-6" : "col-sm-12"}  `}
          key={listing.id}
        >
          <div
            className={
              colstyle
                ? "listing-style1"
                : "listing-style1 listCustom listing-type"
            }
          >
            <div className="list-thumb">
              {listing.images && listing.images.length > 0 ? (
                <Image
                  width={382}
                  height={248}
                  className="w-100 h-100 cover"
                  src={listing.images[0]} // Use the first image from the array
                  alt={listing.title || "listing"} // Add a fallback for the alt text
                />
              ) : (
                <div
                  style={{
                    width: "382px",
                    height: "248px",
                    background: "#ccc",
                  }}
                >
                  No Image Available
                </div>
              )}
              {/*
              <Image
                width={382}
                height={248}
                className="w-100  cover"
                style={{ height: "253px" }}
                src={listing.image}
                alt="listings"
              />
              */}
              <div className="sale-sticker-wrap">
                {!listing.forRent && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    FEATURED
                  </div>
                )}
              </div>

              <div className="list-price">
                {/*
                {listing.price} / <span>mo</span>
                */}
                  {listing.price && (
                    <div>
                      <span>Rent: ₹{listing.price.rent}</span>
                      <br />
                      <span>Sale: ₹{listing.price.sale}</span>
                    </div>
                  )}

              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                {/*
                <Link href={`/single-v4/${listing.id}`}>{listing.title}</Link>
                */}
                <Link href={`/single-v6/${listing._id}`}>{listing.title}</Link>
              </h6>
              <p className="list-text">
              {listing.address && (
                <div>
                  <span>{listing.address.street_address} </span>
                  <span>{listing.address.city} </span>
                  <span>{listing.address.state} </span>
                </div>
              )}
              </p>
              {/*
                <p className="list-text">{listing.location}</p>
                */}
              <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {listing.bed} bed
                </a>
                <a href="#">
                  <span className="flaticon-shower" /> {listing.bath} bath
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing.sqft} sqft
                </a>
              </div>
              <p className="list-text2">
                An exceptional exclusive five bedroom apartment for sale in this
                much sought after development in Knightsbridge.
              </p>
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">For Rent</span>
                <div className="icons d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-fullscreen" />
                  </a>
                  <a href="#">
                    <span className="flaticon-new-tab" />
                  </a>
                  <a href="#">
                    <span className="flaticon-like" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
