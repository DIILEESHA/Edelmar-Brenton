import "./vg.css";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import us6 from "../../assets/us33.jpg";
import us66 from "../../assets/us6.jpg";
import us666 from "../../assets/us44.jpg";
import us6666 from "../../assets/us444.jpg";
import us66666 from "../../assets/us4444.jpg";

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";

import { ArrowLeft, ArrowRight } from "lucide-react";

const Vgallery = () => {
  const swiperRef = useRef(null);

  return (
    <div className="vgallery">
      <div className="vgallery_wrapper">
        {/* Left Arrow */}
        <div
          className="arrow arrow_left"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <ArrowLeft size={30} />
        </div>

        <Swiper
          ref={swiperRef}
          slidesPerView={3} // default for large screens
          spaceBetween={30}
          freeMode={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1, // mobile
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2, // small tablets
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2, // tablets
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3, // laptops
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 4, // large desktops
              spaceBetween: 30,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {[us6, us66, us666, us6666, us66666].map((img, idx) => (
            <SwiperSlide key={idx}>
              <img className="swiper_img" src={img} alt={`Slide ${idx + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Arrow */}
        <div
          className="arrow arrow_right"
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <ArrowRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default Vgallery;