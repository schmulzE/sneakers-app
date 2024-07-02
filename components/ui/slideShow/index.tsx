import { useEffect, useRef, useState } from "react";
import BannerText from "../bannerText";
import SlideContainer from "./slideContainer";
import { gsap } from 'gsap';

const slides = [
  {
    url1: 'https://images.pexels.com/photos/7543637/pexels-photo-7543637.jpeg?auto=compress&cs=tinysrgb&w=600',
    url2: 'https://images.pexels.com/photos/4723006/pexels-photo-4723006.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    url1: 'https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    url2: 'https://images.pexels.com/photos/8473534/pexels-photo-8473534.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
];

const SlideShow = () => {
  const container = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideAnimation = () => {
    gsap.fromTo(
      '.left_image_slide',
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, ease: 'Power2.EaseInOut' }
    );
    gsap.fromTo(
      '.right_image_slide',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'Power2.EaseInOut' }
    );
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    slideAnimation();
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    slideAnimation();
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
    slideAnimation();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({});
      tl.fromTo(
        '#banner-text',
        { opacity: 0, y: -70 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'easein',
        }
      );
      if (currentIndex >= 0) {
        tl.restart();
      }
      slideAnimation();
    }, container);
    return () => ctx.revert();
  }, [currentIndex]);

  return (
    <div className='container px-4 mt-14 md:mt-7' ref={container}>
      <BannerText />
      <SlideContainer
        slides={slides}
        currentIndex={currentIndex}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        goToSlide={goToSlide}
      />
    </div>
  );
};


export default SlideShow;