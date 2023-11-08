'use client'
import React from 'react'
import axios from 'axios'
import useSWR from 'swr'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';


const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Recommendation = ({ name }: { name: string}) => {

  let category: string;
  let scale: string;

  if(name === "men") {
    category = "137174"
    scale = '282'
    console.log(category)
  }else {
    category = "136310"
    scale = '274'
    console.log(category)
  }

  const { data, error } = useSWR<Sneakers>(`${process.env.NEXT_PUBLIC_API_URL}?page=1&view=60&sort=3&scale=${scale}&pagetype=Shopping&rootCategory=${name}&pricetype=FullPrice&c-category=${category}`, fetcher)
  return (
    <div>
       <Swiper
        modules={[ Scrollbar]}
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        className="md:hidden lg:hidden"
        >
        {data.images?.all.map((item: string | undefined, index: React.Key | null | undefined)=> (
          <SwiperSlide key={index}>
            <img src={item} alt="" className='w-full h-full object-cover object-center px-12'/>
          </SwiperSlide>
        ))}
        </Swiper>

    </div>
  )
}

export default Recommendation
 
