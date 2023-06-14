import React, { useState, useEffect } from 'react';
import { BsSquare, BsSquareFill } from 'react-icons/bs';
import { TiChevronRight, TiChevronLeft } from 'react-icons/Ti';
// import { motion } from 'framer-motion';
import {gsap} from 'gsap'
import { Button, Fade } from '@chakra-ui/react';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
  },
];

const slide2 = [
  {
    url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
  },

  {
    url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
  },
]
function Slides() {

  const [currentIndex, setCurrentIndex] = useState(0);

    const slideAnimation = () => {
      gsap.fromTo(".left_image_slide",{autoAlpha: 0, y: 40}, {autoAlpha: 1, y: 0, duration: 1, ease: "Power2.EaseInOut"})
      gsap.fromTo(".right_image_slide",{autoAlpha: 0, y: -40}, {autoAlpha: 1, y: 0, duration: 1, ease: "Power2.EaseInOut"})
    }
  

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    slideAnimation()
  };
  
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length -1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    slideAnimation()
  };
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
    slideAnimation()
  };

  return (
    <div className='lg:max-w-[1000px] md:max-w-[1050px] md:h-[580px] max-w-[1400px] h-[580px] lg:h-[680px] mb-24 w-full lg:flex md:flex m-auto py-16 px-4 relative'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})`}}
        className='left_image_slide lg:w-[50%] md:w-[50%] w-full md:h-[440px] lg:h-full h-full lg:absolute lg:top-0 lg:left-4 bg-center lg:mt-10 md:mt-0 bg-cover'
      ></div>
      <div
        style={{ backgroundImage: `url(${slide2[currentIndex].url})`}}
        className='right_image_slide w-[50%] md:h-[470px] absolute top-0 right-4 lg:h-full h-full bg-center bg-cover hidden md:block lg:block'
      ></div>

    {/* straight line */}
      <div className='w-[107%] h-2 absolute bottom-[54%] left-[1%] bg-black -z-10' />
      {/* Left Arrow */}
      <div className='lg:block lg:-left-14 lg:text-black lg:hover:bg-black lg:hover:text-white lg:uppercase lg:text-xl lg:bg-white lg:rounded-none md:bg-white md:text-black md:hover:text-white md:hover:bg-black group-hover:block absolute md:top-[45%] top-[50%] -translate-x-0 translate-y-[-50%] left-4 text-2xl p-2 bg-black text-white cursor-pointer'>
        <TiChevronLeft onClick={prevSlide} className='block lg:hidden md:hidden text-xl'/>
        <Button textTransform={'uppercase'} px={2} fontWeight={700} onClick={prevSlide} variant='unstyled' display={{ base: "none", md: "block" }}>
          prev
        </Button>
      </div>
      {/* Right Arrow */}
      <div className='lg:block lg:-right-32 lg:text-black lg:hover:bg-black lg:hover:text-white lg:uppercase lg:bg-white lg:rounded-none md:hover:bg-black md:bg-white md:text-black md:hover:text-white group-hover:block absolute top-[50%] md:top-[45%] -translate-x-0 translate-y-[-50%] right-4 text-2xl p-2 bg-black text-white cursor-pointer'>
        <TiChevronRight onClick={nextSlide} className='block lg:hidden md:hidden text-xl'/>
        <Button textTransform={'uppercase'} px={2} fontWeight={700} onClick={prevSlide} variant='unstyled' display={{ base: "none", md: "block" }}>
          next
        </Button>
      </div>
      <div className='flex lg:absolute md:absolute md:bottom-0 md:left-[50%] lg:-bottom-24 lg:left-[50%] justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl m-2 cursor-pointer font-bold'
          >
            {currentIndex === slideIndex ? <BsSquareFill/> : <BsSquare/>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slides;