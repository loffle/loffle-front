import React from 'react';
//
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
// import Swiper core and required modules
import SwiperCore, { Autoplay, Scrollbar } from 'swiper';
// install Swiper modules
SwiperCore.use([Scrollbar, Autoplay]);

const ImageSwiper = ({ product, category }) => {
  return (
    <Swiper
      slidesPerView={1}
      //scrollbar={{ hide: true }}
      autoplay={
        category && {
          delay: 3000,
          disableOnInteraction: false,
        }
      }
      loop={category && true}
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
