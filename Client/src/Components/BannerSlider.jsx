import one from '../assets/banner3.png'
import two from '../assets/banner2.png'
import three from '../assets/banner1.png'



// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter'
import AOS from 'aos';
import Navbar from '../Pages/Shared/Navbar';
AOS.init();



const BannerSlider = () => {
  return (
    <div className='relative'>

   <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2300,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img className='lg:h-[48vw] md:h-[65vw] h-[80vw] w-full object-cover object-center' src={one} alt="image" /></SwiperSlide>
        <SwiperSlide><img className='lg:h-[48vw] md:h-[65vw] h-[80vw] w-full object-cover object-center' src={two} alt="image" /></SwiperSlide>
        <SwiperSlide><img className='lg:h-[48vw] md:h-[65vw] h-[80vw] w-full object-fill object-center' src={three} alt="image" /></SwiperSlide>

      </Swiper>
      {/* <div data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="30"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true" 
                className='text-[8vw] px-[1vw] bg-black bg-opacity-50 
                rounded-sm md:text-[4.5vw] text-[#6cbfe8] absolute bottom-[50%] 
                md:bottom-[55%] right-[30%] md:right-[35%] z-10 font-semibold 
                drop-shadow-2xl '>
                  <p className='font-extrabold'>Volunteer Hub</p>
                  <p className='text-[#d6dad7] text-[4vw] md:text-[3.5vw] lg:text-[3vw]'>      <Typewriter
words={['Join Hands, Make a Difference']}
loop={50}
typeSpeed={70}
deleteSpeed={30}
delaySpeed={3000}
/></p>
                </div> */}
</div>
  );
};

export default BannerSlider;
