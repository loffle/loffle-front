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

const ImageSwiper = ({ product }) => {
  return (
    <Swiper
      scrollbar={{
        hide: true,
      }}
      className="mySwipe"
    >
      {product.images.map((image) => (
        <SwiperSlide key={image.id}>
          <img src={image.src} alt="product" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
