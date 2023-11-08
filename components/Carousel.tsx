import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import Link from 'next/link'
import { IconContext } from "react-icons";
import { useCart } from '../context/CartContext';
import gsap from "gsap";
import ScrollTrigger  from 'gsap/dist/ScrollTrigger'
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger)

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';


const Carousel = ({text, sneakers, gender} : {text: string, sneakers: Sneakers[], gender: string, }) => {
  const {addItem, removeItem, items} = useCart()
  const [slidesPerView, setSlidesPerView] = useState(2)
  const scrollTriggerRef= useRef(null)
    
  const wishlisted = useCallback(
    (item: Sneakers) =>  items.findIndex((it: { id: number; }) => it.id == item.id) != -1
    ,
    [items],
  )
  
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
    const foundItem =  items.find((it: { id: number; }) => it.id === item.id )
    if(foundItem) {
      removeItem(item.id)
    }else {
      addItem(item)
    }
  }

//   useEffect(() => {
//   let ctx = gsap.context(() => {

//     const mySplitText = new SplitType(`#text-${id}`)
    
//     gsap.from('.char', {
//     yPercent: 130,
//     stagger: 0.05,
//     ease: "back.out",
//     duration: 1,
//     scrollTrigger: {
//       trigger: `#text-${id}`,
//       // start: 'top 80%',
//     },
//   })
// })

// return () => {
//   ctx.revert();
// }
//   }, [])

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
        {sneakers.slice(0, 10).filter((item: { id: number }) =>  item.id).map((product)=> (
          <SwiperSlide key={product.id} data-cursor="label" data-cursor-label="drag">
            <div className="grid" data-cursor="label" data-cursor-label="drag">
              <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-6 w-6 z-50"}}>
                <button className="p-2 rounded-full mt-1 mr-2 font-black absolute top-8 right-0 z-50" onClick={() =>{ handleClick(product);}}>
                  {!wishlisted(product) ? <BsSuitHeart/> : <BsSuitHeartFill/>}
                </button>
              </IconContext.Provider>
            <Link data-cursor="label" data-cursor-label="drag"  href={{
              pathname: `/${gender}/sneakers/${product.id}`,
              query: { item: JSON.stringify(product) },
            }} as= {`/${gender}/sneakers/${product.id}`}>
              <a data-cursor="label" data-cursor-label="drag" className='relative'>
              <div data-cursor="label" data-cursor-label="drag" className="z-10 border border-black aspect-w-1 aspect-h-1 w-full h-40 mt-8 overflow-hidden bg-white xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.images?.cutOut}
                  alt={product.shortDescription}
                  className="h-full w-full object-contain object-center p-3"
                  data-cursor="label" data-cursor-label="drag"
                />
              </div>
              <h3 data-cursor="label" data-cursor-label="drag"  className="mt-4 text-sm text-black font-medium ">{product.brand?.name}</h3>
              <p data-cursor="label" data-cursor-label="drag" className="mt-1 text-sm text-black">{product.shortDescription}</p>
              <p data-cursor="label" data-cursor-label="drag" className="mt-1 mb-6 text-base font-medium text-black">{product.priceInfo?.formattedFinalPrice}</p>
              </a> 
              </Link> 
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
    </>
  )
}

export default Carousel