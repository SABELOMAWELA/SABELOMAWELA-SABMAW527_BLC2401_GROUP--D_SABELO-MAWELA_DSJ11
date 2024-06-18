import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const SwiperComponent = ({ images, titles }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}className='section'>
          <img src={image} alt={titles[index]} className='card-swiper' />
          <h2 className='card-heading'>{titles[index]}</h2>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;

