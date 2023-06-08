import type { NextPage } from 'next'
import { useContext, useCallback } from "react";
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
import WishlistContext from "../store/wishlist_context";
import { motion, Variants } from "framer-motion"
// import Banner from "../components/Banner"

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

 const scrollVariants: Variants = {
  offscreen: {
    y: -100
  },
  onscreen: {
    y: 5,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 3
    }
  },
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
 }

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

type MenSneakersPageProps = {
  menSneakers: any[]
  womenSneakers: any[]
}
const Home: NextPage<MenSneakersPageProps> = ( { menSneakers, womenSneakers }) => {
  const wishlistCtx = useContext(WishlistContext)

  const wishlist = wishlistCtx.items


  const wishlisted = useCallback(
  (item : any) =>  wishlist.findIndex((it: { id: any; }) => it.id == item.id) != -1
    ,
  [wishlist],
  )

  const handleClick = (item: { id: number; }) => {
   const foundItem =  wishlistCtx.items.find((it: { id: number; }) => it.id === item.id )
   if(foundItem) {
    wishlistCtx.removeItem(item.id)
   }else {
    wishlistCtx.addItem(item)
   }
  }

  return (
    <>
    <div className='container px-4 md:mt-7'>
      <motion.div initial={{ y: -400}} animate={{ y: 5 }} transition={{ type: "spring", bounce: 0.5, duration: 1, }} id="banner-text" className='mt-6 ml-12'>
        <h3  className='text-lg md:text-2xl md:font-extrabold font-bold uppercase'>fall / winter</h3>
        <h1 className="uppercase text-2xl font-bold md:text-6xl md:font-extrabold md:mb-14 md:mt-8">new season drop</h1>
        <div id='button' className='my-6'>
          <Link href={''}>
            <a className='p-2 border-4 md:px-14 md:text-sm border-neutral-900 uppercase text-xs font-bold border-r-0'>shop men</a>
          </Link>
          <Link href={''}>
            <a className='p-2 border-4 md:px-14 md:text-sm border-neutral-900 uppercase text-xs font-bold'>shop women</a>
          </Link>
        </div>
      </motion.div>
    
        <Slides/>

    </div>
   
    <div id="section-2" className='mt-10 relative px-4 py-64'>
      <motion.div variants={scrollVariants} initial={"offscreen"} whileInView={"onscreen"} viewport={{ once: true, amount: 0. }}  className="border-4 border-neutral-900 py-10 px-14 w-64 text-left absolute top-0 right-14 z-10 md:right-10">
          <span  className="block text-lg font-bold uppercase">the concept</span>
          <h3 className="uppercase font-bold text-2xl">
            minimal frames intense colors dynamic lifestyle
          </h3>
      </motion.div>
      <div id="image-1" className="absolute bottom-0">
        {/* <Image src="/Cromier-HP-Banner-Concept.jpg" alt="" width={345} height={245} /> */}
        <Image src="/Cromier-HP-Banner-Concept.jpg" alt="" width={516} height={367} />
      </div>
    </div>
  
     <div className='px-4 grid md:grid-cols-2'>
     <Swiper
        modules={[ Pagination, Autoplay ]}
        spaceBetween={50}
        slidesPerView={1}
        loop
        autoplay
        pagination={{ clickable: true }}
        className=" w-52 md:w-68 md:my-0 md:mt-28 my-8"
        >
        {menSneakers.slice(0, 10).filter((item: { id: number }) =>  item.id).map((product: any)=> (
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
                  alt={product.imageAlt}
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
        
        <div id="section-4" className='relative py-64 px-4'>
          <div className="text-right w-48 absolute top-0 md:top-48 md:-left-10 z-10">
            <motion.span variants={colorVariants} animate="visible" className="uppercase font-bold">fw22-23</motion.span>
            <motion.div variants={colorVariants} animate="visible" className="uppercase font-bold text-3xl md:text-5xl md:break-normal md:flex md:justify-end">men<br className='mr-12'/>collection</motion.div>
            <Link href={''}>
              <a className='my-4 py-1 bg-white text-center block border-4 border-neutral-900 uppercase text-lg font-bold'>shop now</a>
            </Link>
          </div>
          <div id="image" className='absolute bottom-0 right-4 pt-4'>
            <Image src="/men.jpg" alt="" width={258} height={389}/>
          </div>
        </div>
      </div>


    <div className='px-2 grid md:grid-cols-2 mt-28 mb-[36px]'>
       <Swiper
        modules={[ Pagination, Autoplay ]}
        spaceBetween={50}
        slidesPerView={1}
        loop
        autoplay
        pagination={{ clickable: true }}
        className="w-52 md:w-68 my-8 md:my-0 md:mt-28 order-last"
        >
        {womenSneakers.slice(0, 10).filter((item: { id: number }) =>  item.id).map((product: any)=> (
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
                  alt={product.imageAlt}
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

      <div id="section-5" className='relative py-64 order-1'>
        <div className="text-left w-48 absolute top-0 right-0 z-10 md:top-48 md:-right-10 ">
          <motion.span variants={colorVariants} animate="visible" className="uppercase font-bold">fw22-23</motion.span>
          <motion.div variants={colorVariants} animate="visible" className="uppercase font-bold text-3xl md:text-5xl md:break-normal">women<br className='my-1'/>collection</motion.div>
        <Link href={''}>
          <a className='my-4 py-1 bg-white text-center block border-4 border-neutral-900 uppercase text-lg font-bold'>shop now</a>
        </Link>
        </div>
        <div id="image" className='absolute bottom-0 left-4 pt-4'>
          <Image src="/women.jpg" alt="" width={258} height={389}/>
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
    fetch('https://www.farfetch.com/ng/plpslice/listing-api/products-facets?page=1&view=60&sort=3&scale=282&pagetype=Shopping&rootCategory=Men&pricetype=FullPrice&c-category=137174', options).then(r => r.json()).then(result =>  result.listingItems.items),
    fetch("https://www.farfetch.com/ng/plpslice/listing-api/products-facets?page=1&view=60&sort=3&scale=274&pagetype=Shopping&rootCategory=Women&pricetype=FullPrice&c-category=136310", options).then(r => r.json()).then(result =>  result.listingItems.items),
  ])

  // Pass data to the page via props
  return { props: { menSneakers, womenSneakers }}
}
export default Home
