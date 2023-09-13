import type { NextPage } from 'next'
import { useContext, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import Link from 'next/link'
import Image from "next/image";
import { IconContext } from "react-icons";
import Cromier from "../public/Cromier-HP-Banner-Concept.jpg";
import Banner1 from "../public/image-banner-1.jpg"
import Banner2 from "../public/image-banner-2.jpg"
import Banner3 from "../public/image-banner3.jpg"
import Card from "../components/Card"
import { BsTag, BsQuestionCircle, BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import Form from "../components/Form";
import options from '../client_api/options';
import { motion, Variants } from "framer-motion"
import {gsap} from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade'
import Slides from '../components/Slides';
import { useCart } from '../context/CartContext';

 const banner: {}[] = [
  {
    img: Banner1,
    alt: 'Banner1'
  },
  {
    img: Banner3,
    alt: 'Banner3'
  },
  {
    img: Banner3,
    alt: 'Banner3'
  },
  {
    img: Banner3,
    alt: 'Banner3'
  },
  {
    img: Banner3,
    alt: 'Banner3'
  },
 ]

 const colorVariants: Variants = {
    visible: {
      color: ["#000","#60F", "#09F", "#FA0", "#A06", "#0E4", "#30E"],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: [0.075, 0.82, 0.165, 1],
        delay: 5
      }
    }
  };
  
  // gsap.registerPlugin(ScrollTrigger)
  
  type MenSneakersPageProps = {
    menSneakers: Sneakers[]
    womenSneakers: Sneakers[]
  }
  const Home: NextPage<MenSneakersPageProps> = ( { menSneakers, womenSneakers }) => {
  const sectionTwo = useRef()    
  const {addItem, removeItem, items} = useCart()
    
    const wishlisted = useCallback(
      (item: Sneakers) =>  items.findIndex((it: { id: number; }) => it.id == item.id) != -1
      ,
      [items],
    )
    useEffect(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionTwo.current,
            start: 'top center',
          }
        });
        tl.from('.text-block',{ y: -60, duration: 1, ease: 'Power2.easeIn'})
        tl.from('#image-1',{ y: 80, duration: 1, ease: 'Power2.easeIn'})
      })
      return () => ctx.revert()
    }, [])
      
  const handleClick = (item: { id: number; }) => {
    const foundItem =  items.find((it: { id: number; }) => it.id === item.id )
    if(foundItem) {
      removeItem(item.id)
    }else {
      addItem(item)
    }
  }

  return (
    <>
    <Slides/>
   
    <div id="section-2" className='mt-10 relative px-14 py-64' ref={sectionTwo}  >
      <div className="text-block hover:bg-black hover:text-white border-4 border-neutral-900 py-10 px-14 w-64 text-left absolute bottom-0 lg:top-0 right-14 lg:right-[12%] lg:w-[350px] z-10 md:right-10">
          <span  className="block text-lg lg:text-xl font-bold lg:font-black uppercase">the concept</span>
          <h3 className="uppercase font-bold text-2xl lg:text-5xl">
            minimal frames intense colors dynamic lifestyle
          </h3>
      </div>
      <div id="image-1" className="absolute top-0 left-4 md:left-8 lg:left-14" >
        <img src="/Cromier-HP-Banner-Concept.jpg" className='lg:max-w-[800px] sm:max-w-xs max-w-xs md:max-w-lg lg:mt-20'/>
      </div>
    </div>
  
     <div className='px-4 grid md:grid-cols-2 mt-10 sm:mt-48 md:mb-20 lg:mt-[500px] relative'>  
     <Swiper
        modules={[ Pagination, Autoplay ]}
        spaceBetween={50}
        slidesPerView={1}
        loop
        autoplay
        pagination={{ clickable: true }}
        className=" w-52 lg:w-96 md:w-68 md:my-0 md:mt-28 my-8 lg:absolute lg:-top-28 lg:left-[5%] md:order-first order-last lg:order-first"
        >
        {menSneakers.slice(0, 10).filter((item: { id: number }) =>  item.id).map((product)=> (
          <SwiperSlide key={product.id}>
            <div className="grid">
            <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-6 w-6"}}>
              <button className="relative justify-self-end p-2 w-9 h-9 rounded-full mt-1 mr-3 font-black z-10" onClick={() =>{ handleClick(product);}}>
                {!wishlisted(product) ? <BsSuitHeart/> : <BsSuitHeartFill/>}
              </button>
            </IconContext.Provider>
            <Link  href={{
              pathname: `/men/sneakers/${product.id}`,
              query: { item: JSON.stringify(product) },
            }} as= {`/men/sneakers/${product.id}`}>
              <a>
              <div className="aspect-w-1 aspect-h-1 w-full h-40 overflow-hidden bg-white xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.images?.cutOut}
                  alt={product.shortDescription}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 p-3"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 font-medium">{product.brand?.name}</h3>
              <p className="mt-1 text-lg text-gray-900">{product.shortDescription}</p>
              <p className="mt-1 mb-6 text-lg font-medium text-gray-900">{product.priceInfo?.formattedFinalPrice}</p>
              </a> 
              </Link> 
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
        
        <div id="section-4" className='relative py-64 px-4 md:order-1'>
          <div className="text-right w-48 absolute top-0 md:top-48 md:-left-10 lg:-top-16 lg:-left-12 z-10">
            <motion.span variants={colorVariants} animate="visible" className="uppercase font-bold">fw22-23</motion.span>
            <motion.div variants={colorVariants} animate="visible" className="uppercase font-bold text-3xl md:text-5xl lg:text-5xl md:break-normal md:flex md:justify-end">men<br className='mr-12'/>collection</motion.div>
            <Link href={''}>
              <a className='my-4 py-1 bg-white text-center block border-4 border-neutral-900 uppercase text-lg font-bold'>shop now</a>
            </Link>
          </div>
          <div id="image" className='absolute bottom-0 right-4 pt-4'>
            <img src={"/men.jpg"} className='lg:max-w-[600px]'/>
          </div>
        </div>
      </div>


    <div className='px-2 grid md:grid-cols-2 lg:mt-64 mb-[36px] md:mt-10'>
       <Swiper
        modules={[ Pagination, Autoplay ]}
        spaceBetween={50}
        slidesPerView={1}
        loop
        autoplay
        pagination={{ clickable: true }}
        className="w-52 md:w-68 my-8 md:my-0 md:mt-28 order-last lg:w-[450px] lg:flex lg:flex-col lg:justify-center lg:self-center"
        >
        {womenSneakers.slice(0, 10).filter((item: { id: number }) =>  item.id).map((product)=> (
          <SwiperSlide key={product.id}>
            <div className="grid">
            <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-6 w-6"}}>
              <button className="relative justify-self-end p-2 w-9 h-9 rounded-full mt-1 mr-3 font-black z-10" onClick={() =>{ handleClick(product);}}>
                {!wishlisted(product) ? <BsSuitHeart/> : <BsSuitHeartFill/>}
              </button>
            </IconContext.Provider>
            <Link  href={{
              pathname: `/women/sneakers/${product.id}`,
              query: { item: JSON.stringify(product) },
            }} as= {`/women/sneakers/${product.id}`}>
              <a>
              <div className="aspect-w-1 aspect-h-1 w-full h-40 overflow-hidden bg-white xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.images?.cutOut}
                  alt={product.shortDescription}
                  className="h-full w-full object-contain object-center group-hover:opacity-75 p-3"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 font-medium">{product.brand?.name}</h3>
              <p className="mt-1 text-lg text-gray-900">{product.shortDescription}</p>
              <p className="mt-1 mb-6 text-lg font-medium text-gray-900">{product.priceInfo?.formattedFinalPrice}</p>
              </a> 
              </Link> 
            </div>
          </SwiperSlide>
        ))}
        </Swiper>

      <div id="section-5" className='relative py-64 order-1'>
        <div className="text-left w-48 absolute top-0 right-0 z-10 md:top-48 md:-right-10 lg:top-24 lg:right-9">
          <motion.span variants={colorVariants} animate="visible" className="uppercase font-bold">fw22-23</motion.span>
          <motion.div variants={colorVariants} animate="visible" className="uppercase font-bold text-3xl lg:text-4xl md:text-5xl md:break-normal">women<br className='my-1'/>collection</motion.div>
        <Link href={''}>
          <a className='my-4 py-1 bg-white text-center block border-4 border-neutral-900 uppercase text-lg font-bold'>shop now</a>
        </Link>
        </div>
        <div id="image" className='absolute bottom-0 left-4 pt-4'>
          <img src='/women.jpg' className='lg:max-w-[500px]'/>
        </div>
      </div>
    </div>
    <div id="section-6" className="px-4 md:grid md:grid-cols-3 gap-4 mt-3">
      <Card icon={<BsTag/>} header="HOW TO SHOP" text='your guide to shopping and placing orders'/>
      <Card icon={<BsQuestionCircle/>} header="FAQs"  text='your questions answered'/>
      <Card icon={<FaRegComment/>} header="NEED HELP?" text="contact our global Customer Service team"/>
    </div>

    <Form/>
    </>
  )
}

export async function getStaticProps() {
  // Fetch data from external API
  const [menSneakers, womenSneakers] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}?page=1&view=20&sort=3&scale=282&pagetype=Shopping&rootCategory=Men&pricetype=FullPrice&c-category=137174`, options).then(r => r.json()).then(result =>  result.listingItems.items.map((item: Sneakers) => ({...item, quantity: 1, size: 38}))),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}?page=1&view=20&sort=3&scale=274&pagetype=Shopping&rootCategory=Women&pricetype=FullPrice&c-category=136310`, options).then(r => r.json()).then(result =>  result.listingItems.items.map((item: Sneakers) => ({...item, quantity: 1, size: 38}))),
  ])

  // Pass data to the page via props
  return { props: { menSneakers, womenSneakers }}
}
export default Home
