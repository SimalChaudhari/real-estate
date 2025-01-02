"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const sliderItems = [
    {
      image: "/images/home/home-5-1.jpg",
      price: "₹986,00",
      title: "Studio on Grand Avenue",
      description: "32 Beds - 91 Baths - 1500 sq ft",
    },
    {
      image: "/images/home/home-5-2.jpg",
      price: "₹986,00",
      title: "Studio on Grand Avenue",
      description: "32 Beds - 91 Baths - 1500 sq ft",
    },
    {
      image: "/images/home/home-5-3.jpg",
      price: "₹986,00",
      title: "Studio on Grand Avenue",
      description: "32 Beds - 91 Baths - 1500 sq ft",
    },
    {
      image: "/images/home/home-5-4.jpg",
      price: "₹986,00",
      title: "Studio on Grand Avenue",
      description: "32 Beds - 91 Baths - 1500 sq ft",
    },
  ];

  return (
    <div>
      {/* Main Slider */}
      <div className="hero-large-home5">
        <Swiper
          direction="vertical"
          spaceBetween={0}
          slidesPerView={1}
          speed={1400}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Thumbs, Autoplay]}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          style={{ height: "850px" }}
        >
          {sliderItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="slider-slide-item"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 text-left position-relative">
                      <h3 className="h6 slider-title text-white">{item.title}</h3>
                      <div className="slider-btn-block mt-3">
                        <Link
                          href="/list-v1"
                          className="ud-btn btn-white slider-btn"
                        >
                          View Details
                          <i className="fal fa-arrow-right-long ms-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbs Gallery */}
      <div className="custom_thumbs mt-3">
        <Swiper
          direction="vertical"
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          slidesPerView={sliderItems.length}
          spaceBetween={10}
          style={{ height: "268px" }}
        >
          {sliderItems.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                width={80}
                height={80}
                className="thumb-image"
                src={item.image}
                alt={`Thumbnail for ${item.title}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
