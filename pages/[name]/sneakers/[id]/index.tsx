import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from '../../../../components/Form'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';


const Sneaker = () => {

  const router = useRouter();
  const { item }  = router.query;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState: any = []
  const [ product, setProduct] = useState(initialState)


  useEffect(() => {
    if(!item) {
      return;
    }
    const storeproduct = async () => {
        localStorage.setItem("item", item as string);
    }
    storeproduct()
  }, [item])

   useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem("item")!);
    if (wishlistData) {
      setProduct(wishlistData);
    }
  }, []);

  console.log(product)


  return (
    <>
      <div className='px-2'>
        <Swiper
        modules={[ Scrollbar]}
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
        {product.images?.all.map((item: string | undefined, index: React.Key | null | undefined)=> (
          <SwiperSlide key={index}>
            <img src={item} alt="" className='w-full h-full object-cover object-center px-12'/>
          </SwiperSlide>
        ))}
        </Swiper>
        <h3 className="mt-4 text-xl text-gray-700 font-black">{product.brand?.name}</h3>
        <p className="mt-1 text-lg text-gray-900">{product.shortDescription}</p>
        <p className="mt-1 text-2xl text-gray-900 ">{product.priceInfo?.formattedFinalPrice}</p>
        <button className='capitalize bg-white text-black px-4 font-medium my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full'>            
          add to bag
        </button>
      </div>
      <Form/>
    </>
  )
}

export default Sneaker