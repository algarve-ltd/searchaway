"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from "swiper/modules";

const banner_thumb: string[] = [
   "/assets/img/hero/hero-1.jpg",
   "/assets/img/hero/hero-2.jpg",
   "/assets/img/hero/hero-3.jpg",
   "/assets/img/hero/hero-4.jpg",
   "/assets/img/hero/hero-5.jpg",
]

const setting = {
   slidesPerView: 1,
   loop: true,
   spaceBetween: 0,
   speed: 2000,
   effect: 'fade',
   autoplay: {
      delay: 3500,
      disableOnInteraction: false
   },
};

const Banner = () => {
   return (
      <div className="tg-hero-area fix p-relative">
         <div className="tg-hero-top-shadow"></div>
         <div className="shop-slider-wrapper" style={{ height: '500px', overflow: 'hidden' }}>
            <style jsx>{`
               @media (max-width: 991px) {
                  .shop-slider-wrapper {
                     height: 750px !important;
                  }
               }
            `}</style>
            <Swiper {...setting} modules={[EffectFade, Autoplay]} className="swiper-container tg-hero-slider-active">
               {banner_thumb.map((thumb, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                     <div className="tg-hero-bg">
                        <div className="tg-hero-thumb" style={{ backgroundImage: `url(${thumb})` }}></div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>

         <div className="tg-hero-content-area">
            <div className="container">
               <div className="p-relative">
                  {/* Content removed - search bar now in header */}
               </div>
            </div>
         </div>
         <div className="tg-hero-bottom-shape d-none d-md-block">
            <span>
               <svg width="432" height="298" viewBox="0 0 432 298" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="line-1" opacity="0.4" d="M39.6062 428.345C4.4143 355.065 -24.2999 203.867 142.379 185.309C350.726 162.111 488.895 393.541 289.171 313.515C129.391 249.494 458.204 85.4772 642.582 11.4713" stroke="white" strokeWidth="24" />
               </svg>
            </span>
         </div>
         <div className="tg-hero-bottom-shape-2 d-none d-md-block">
            <span>
               <svg width="154" height="321" viewBox="0 0 154 321" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="line-1" opacity="0.4" d="M144.616 328.905C116.117 300.508 62.5986 230.961 76.5162 179.949C93.9132 116.184 275.231 7.44493 -65.0181 12.8762" stroke="white" strokeWidth="24" />
               </svg>
            </span>
         </div>
      </div>
   )
}

export default Banner
