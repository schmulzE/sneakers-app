import ArrowButton from "../arrowButton";
import Slide, { Slides } from "./slide";
import SlideIndicators from "./slideIndicators";

interface SlideContainerProps {
  slides: Slides[],
  currentIndex: number,
  prevSlide: () =>  void,
  nextSlide: () => void,
  goToSlide: (slideIndex: number) => void
}

const SlideContainer: React.FC<SlideContainerProps> = ({ slides, currentIndex, prevSlide, nextSlide, goToSlide }) => (
  <div className='lg:max-w-[1000px] md:max-w-[1050px] md:h-[580px] max-w-[1400px] h-[580px] lg:h-[680px] mb-24 w-full lg:flex md:flex m-auto lg:py-16 px-4 relative'>
    <Slide
      imageClass='left_image_slide'
      url={slides[currentIndex].url1}
      additionalClasses='lg:w-[50%] md:w-[50%] w-full md:h-[440px] lg:h-full h-full lg:absolute lg:top-0 lg:left-4 lg:mt-10'
    />
    <Slide
      imageClass='right_image_slide'
      url={slides[currentIndex].url2}
      additionalClasses='w-[50%] md:h-[470px] absolute top-0 right-4 lg:h-full h-full hidden md:block lg:block'
    />
    <div className='lg:w-[107%] md:w-full h-2 absolute bottom-[54%] left-[1%] bg-black -z-10' />
    <ArrowButton direction='left' onClick={prevSlide} />
    <ArrowButton direction='right' onClick={nextSlide} />
    <SlideIndicators slides={slides} currentIndex={currentIndex} goToSlide={goToSlide} />
  </div>
);

export default SlideContainer;