import React from 'react';
//
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
// import Swiper core and required modules
import SwiperCore, { Scrollbar } from 'swiper';
// install Swiper modules
SwiperCore.use([Scrollbar]);

const ImageSwiper = ({ children, product }) => {
  return (
    <div className=" bg-secondary-light pb-8 relative">
      <div className="px-5 py-1 m-5 bg-white absolute z-20 rounded-full shadow-md text-secondary">
        진행중
      </div>
      <div className="flex items-center justify-center ">
        <div className="w-11/12 h-11/12">
          <Swiper
            scrollbar={{
              hide: true,
            }}
            className="mySwiper bg-secondary-light"
          >
            {product.images.map((image) => (
              <SwiperSlide key={image.id}>
                <img src={image.src} alt="product" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ImageSwiper;
