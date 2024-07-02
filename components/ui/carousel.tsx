import gsap from "gsap";
import { Swiper, SwiperSlide } from 'swiper/react';
import ScrollTrigger  from 'gsap/dist/ScrollTrigger';
import { useWishlist } from '../../context/wishlistContext';
import React, { useEffect, useRef, useState } from 'react';
gsap.registerPlugin(ScrollTrigger)

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import WishlistButton from '../wishlist/wishlistButton';
import SneakerListItem from "../sneaker/sneakerListItem";

const Carousel = ({text, sneakers, gender} : {text: string, sneakers: Sneakers[], gender: string, }) => {
  const {addToWishlist, removeFromWishlist, wishlists} = useWishlist()
  const [slidesPerView, setSlidesPerView] = useState(2)
  const scrollTriggerRef= useRef(null)
  
  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 768) {
        setSlidesPerView(5)
      }else{
        setSlidesPerView(2)
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
 

  const handleClick = (item: { id: number; }) => {
    const foundItem =  wishlists.find((it: { id: number; }) => it.id === item.id )
    if(foundItem) {
      removeFromWishlist(item.id)
    }else {
      addToWishlist(item)
    }
  }

  return (
    <>
      <h1 ref={scrollTriggerRef} id={`text`} className='split text-4xl font-bold lg:text-9xl lg:font-medium uppercase text-black'>{text}</h1>
       <Swiper
        spaceBetween={50}
        slidesPerView={slidesPerView}
        loop
        data-cursor="label" data-cursor-label="drag"
        className="cursor-pointer border border-black w-full md:w-full mb-8 order-last lg:w-full lg:flex lg:flex-col lg:justify-center lg:self-center"
        >
        {sneakers.slice(0, 10).filter((item: { id: number }) => item.id).map((sneaker)=> (
          <SwiperSlide key={sneaker.id} data-cursor="label" data-cursor-label="drag">
            <div className="grid" data-cursor="label" data-cursor-label="drag">
              <WishlistButton sneaker={sneaker} handleClick={handleClick}/>
              {/* <Link data-cursor="label" data-cursor-label="drag"  href={{
                pathname: `/${gender}/sneakers/${sneaker.id}`,
                query: { item: JSON.stringify(sneaker) },
              }} as= {`/${gender}/sneakers/${sneaker.id}`}>
                <a data-cursor="label" data-cursor-label="drag" className='relative'>
                <div data-cursor="label" data-cursor-label="drag" className="z-10 border border-black aspect-w-1 aspect-h-1 w-full h-40 mt-8 overflow-hidden bg-white xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={sneaker.images?.cutOut}
                    alt={sneaker.shortDescription}
                    className="h-full w-full object-contain object-center p-3"
                    data-cursor="label" data-cursor-label="drag"
                  />
                </div>
                <h3 data-cursor="label" data-cursor-label="drag"  className="mt-4 text-sm text-black font-medium ">{sneaker.brand?.name}</h3>
                <p data-cursor="label" data-cursor-label="drag" className="mt-1 text-sm text-black">{sneaker.shortDescription}</p>
                <p data-cursor="label" data-cursor-label="drag" className="mt-1 mb-6 text-base font-medium text-black">{sneaker.priceInfo?.formattedFinalPrice}</p>
                </a> 
              </Link> */}
              <SneakerListItem gender={gender} sneaker={sneaker} dataCursor="label" dataCursorLabel="drag"/>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
    </>
  )
}

export default Carousel