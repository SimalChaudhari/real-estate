"use client";
import { GetList } from "@/BackendApi/Listing/ListingApi";
import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const FeaturedListings = () => {
  const [listings2, setListings2] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await GetList(); // Call the GetList function
        // console.log("Fetched Listings:", data); // Log the fetched data
        setListings2(data?.data || []); // Assume `data.data` contains the list of properties
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error.message);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);
  
  if (loading) {
    return <div>Loading featured listings...</div>;
  }
  return (
    <div>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {listings2.slice(0, 4).map((listing) => (
          <SwiperSlide key={listing._id}>
            <div className="item">
              <div className="listing-style1">
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
                    className="w-100 h-100 cover"
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
                    {listing.price} / <span>mo</span>
                  </div>
                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    {/*
                    <Link href={`/single-v1/${listing.id}`}>{listing.title}</Link>
                  */}
                    <Link href={`/single-v3/${listing._id}`}>{listing.title}</Link>
                  </h6>
                  <p className="list-text">{listing.location}</p>
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
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="row align-items-center justify-content-center">
        <div className="col-auto">
          <button className="featured-prev__active swiper_button">
            <i className="far fa-arrow-left-long" />
          </button>
        </div>
        {/* End prev */}

        <div className="col-auto">
          <div className="pagination swiper--pagination featured-pagination__active" />
        </div>
        {/* End pagination */}

        <div className="col-auto">
          <button className="featured-next__active swiper_button">
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
        {/* End Next */}
      </div>
      {/* End .col for navigation and pagination */}
    </div>
  );
};

export default FeaturedListings;
