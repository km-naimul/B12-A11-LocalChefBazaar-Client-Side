import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// IMPORTANT: Swiper er CSS gulo import na korle slides upor niche show korbe
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <div className='my-6'>
      <div className="text-center">
        <h3 className="text-3xl text-center font-semibold mb-2">What our customers said? </h3>
      </div>

      <>
        <Swiper
          loop={true}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}          // আগে string ছিল, এখন number (same result, just safer)
          coverflowEffect={{
            rotate: 30,
            stretch: '50%',
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {
            reviews.map(review => <SwiperSlide key={review.id}>
            <ReviewCard review={review}> </ReviewCard>
          </SwiperSlide>)
          }
          
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
