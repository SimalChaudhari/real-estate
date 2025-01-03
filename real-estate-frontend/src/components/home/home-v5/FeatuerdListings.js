"use client";
import { useFetchData } from "@/app/api/fetch-list";
import { fetchListingsFailure, fetchListingsStart, fetchListingsSuccess } from "@/app/features/listingsSlice";
import { GetList } from "@/services/listing/listingApi";
// import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const FeaturedListings = () => {
  const [listings2, setListings2] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const listingsData = useSelector((state) => state.listings?.listings);

  useEffect(() => {
    const fetchListings = async () => {
      dispatch(fetchListingsStart());
      try {
        const data = await GetList(); // Call the GetList function
        // console.log("Fetched Listings:", data); // Log the fetched data
        setListings2(data?.data || []); // Assume `data.data` contains the list of properties
        dispatch(fetchListingsSuccess(data?.data || []));
        setLoading(false);
      } catch (error) {
        dispatch(fetchListingsFailure(error.message));
        console.error("Error fetching listings:", error.message);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);


  const { fetchData } = useFetchData()

  useEffect(() => {
    fetchData()
  }, [])

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
        {listingsData.slice(0, 4).map((listing) => (
          <SwiperSlide key={listing._id}>
            <div className="item">
              <div className="listing-style7 mb60">
                <div className="list-thumb">
                  {listing.images && listing.images.length > 0 ? (
                    <Image
                      width={382}
                      height={248}
                      // className="w-100 h-100"
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
                    {listing.forRent && (
                      <div className="list-tag rounded-0 fz12">
                        <span className="flaticon-electricity" />
                        FEATURED
                      </div>
                    )}
                    <div className="list-tag2 rounded-0 fz12">FOR SALE</div>
                  </div>

                  <div className="list-meta">
                    <a href="#" className="mr5">
                      <span className="flaticon-fullscreen" />
                    </a>
                    <a href="#" className="mr5">
                      <span className="flaticon-new-tab" />
                    </a>
                    <a href="#">
                      <span className="flaticon-like" />
                    </a>
                  </div>
                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link href={`/single-v6/${listing._id}`}>{listing.title}</Link>
                  </h6>

                  <div className="d-flex justify-content-between align-items-center">
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
                    <div className="list-meta2 d-flex align-items-center">
                      <a href="#" className="mr10">
                        <span className="flaticon-bed mr5" /> {listing.bed}
                      </a>
                      <a href="#" className="mr10">
                        <span className="flaticon-shower mr5" /> {listing.bath}
                      </a>
                      <a href="#">
                        <span className="flaticon-expand" /> {listing.sqft}
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
