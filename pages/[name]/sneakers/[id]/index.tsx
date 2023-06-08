import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import Form from '../../../../components/Form';
import BagContext from "../../../../store/bag_context"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import { BsTag, BsQuestionCircle } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import Card from '../../../../components/Card';
import {
  
  Select,
} from "chakra-react-select";
import Description from '../../../../components/Description';


const Sneaker = () => {
  const bagCtx =  useContext(BagContext)
  const bag = bagCtx.items

  const router = useRouter();
  const { item }  = router.query;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState: any = []
  const [ product, setProduct] = useState(initialState)

  const baggedItem = useCallback(
    (item : any) =>  bag.findIndex((it: { id: any; }) => it.id == item.id) != -1
     ,
    [bag],
  )
  

  const addToBagHandler = (item: { id: number; }) => {
    const foundItem =  bagCtx.items.find((it: { id: number; }) => it.id === item.id )
    if(foundItem) {
      return
    }else {
      bagCtx.addItem(item)
    }
  }


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


  function deliveryDate(interval: number){
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + interval);
    const exactDay = tomorrow.toString().slice(3, 10)
    return exactDay
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
 

  return (
    <>
      <div className='px-2'>
        <Swiper
        modules={[ Scrollbar]}
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        className="md:hidden lg:hidden"
        >
        {product.images?.all.map((item: string | undefined, index: React.Key | null | undefined)=> (
          <SwiperSlide key={index}>
            <img src={item} alt="" className='w-full h-full object-cover object-center px-12'/>
          </SwiperSlide>
        ))}
        </Swiper>
          <h3 className="mt-4 text-xl text-gray-700 font-black md:hidden lg:hidden">{product.brand?.name}</h3>
          <p className="mt-1 text-lg text-gray-900 md:hidden lg:hidden">{product.shortDescription}</p>
          <p className="mt-1 text-2xl text-gray-900 md:mt-8 md:mb-24 md:hidden lg:hidden">{product.priceInfo?.formattedFinalPrice}</p>
          {!baggedItem(product) ? <button onClick={() => {addToBagHandler(product)}} className='capitalize bg-slate-900 text-slate-50 px-4 font-semibold my-4 py-3 outline-none border border-slate-800 rounded-lg block w-full md:hidden lg:hidden'>            
            add to bag
          </button> :
          <a className='capitalize text-center bg-neutral-900 text-white px-4 font-medium my-4 py-2 outline-none border border-slate-800 rounded-lg block w-fullmd:hidden lg:hidden'>            
            in your bag
          </a>}
          <p className="uppercase text-lg md:hidden lg:hidden">estimated delivery</p>
          <span className="text-xl md:hidden lg:hidden"> {deliveryDate(3)} - {deliveryDate(6)}</span>


        <div className="md:grid grid-cols-2 gap-2 hidden xl:grid-cols-3 xl:container xl:mx-auto">
         <div className="grid grid-cols-2 gap-4 max-w-4xl xl:col-span-2">  
          {product.images?.all.map((item: string | undefined, index: React.Key | null | undefined)=> (  
          <div key={index} className="">
            <img src={item} alt="" className='w-2xl object-cover object-center px-2'/>
          </div>
        ))}
        </div>
        <div className='px-4 sticky right-0'>
          <h3 className="mt-4 text-xl lg:text-2xl text-gray-700 font-black">{product.brand?.name}</h3>
          <p className="mt-1 text-lg lg:text-xl text-gray-900">{product.shortDescription}</p>
          <p className="mt-1 text-2xl lg:text-3xl text-gray-900 md:mt-8 md:mb-24">{product.priceInfo?.formattedFinalPrice}</p>
          
          <div className="underline text-right my-6">Size guide</div>

          <Select placeholder='Select option' options={options} className=""/>
          <div className="grid grid-cols-3 gap-1">
          {!baggedItem(product) ? <button onClick={() => {addToBagHandler(product)}} className='capitalize col-span-2 bg-slate-900 text-slate-50 px-4 font-semibold my-4 py-3 outline-none border border-slate-800 rounded-lg block w-full'>            
            add to bag
          </button> :
          <a className='capitalize col-span-2 text-center bg-neutral-900 text-white px-4 font-medium my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full'>            
            in your bag
          </a>}
            <button onClick={() => {addToBagHandler(product)}} className='capitalize col-span-1 bg-white text-black px-4 font-bold my-4 py-3 outline-none border border-slate-800 rounded-lg block w-full'>            
            wishlist
          </button> 
          </div>
          <p className="uppercase text-lg">estimated delivery</p>
          <span className="text-xl"> {deliveryDate(3)} - {deliveryDate(6)}</span>
        </div>
      </div>

      <Description product={product}/>

        <div id="section-6" className="hidden px-2 md:grid md:grid-cols-3 gap-4 mt-3 xl:container xl:mx-auto">
          <Card icon={<BsTag/>} header="HOW TO SHOP" text='your guide to shopping and placing orders'/>
          <Card icon={<BsQuestionCircle/>} header="FAQs"  text='your questions answered'/>
          <Card icon={<FaRegComment/>} header="NEED HELP?" text="contact our global Customer Service team"/>
        </div>
        
        <hr className="md:hidden lg:hidden"/>
          
        <div id="contact" className=' md:hidden lg:hidden'>
          <h3 className="text-2xl mt-12">Contact us</h3>
          <a className='text-center text-lg font-semibold text-neutral-900 bg-white px-4  my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full'>            
            customerservice@sneakfit.com
          </a>
          <a className='text-center text-lg text-neutral-900 bg-white px-4 font-semibold my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full'>            
            Call us
          </a>
        </div>  
      </div>
      <Form/>
    </>
  )
}

export default Sneaker