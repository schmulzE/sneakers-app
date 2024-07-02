import React from "react";
import { BsSquare, BsSquareFill } from 'react-icons/bs';
import { Slides } from "./slide";

interface SlideIndicatorsProp{
  slides: Slides[],
  currentIndex: number,
  goToSlide:( slideIndex: number) => void
}

const SlideIndicators: React.FC<SlideIndicatorsProp> = ({ slides, currentIndex, goToSlide }) => (
  <div className='flex lg:absolute md:absolute md:bottom-0 md:left-[50%] lg:-bottom-24 lg:left-[50%] justify-center py-2'>
    {slides.map((slide, slideIndex) => (
      <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='text-2xl m-2 cursor-pointer font-bold' data-testid={`slide-indicator-${slideIndex}`}>
        {currentIndex === slideIndex ? <BsSquareFill /> : <BsSquare />}
      </div>
    ))}
  </div>
);


export default SlideIndicators;