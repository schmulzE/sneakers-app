import React from 'react'
import { UnorderedList, ListItem } from '@chakra-ui/react'

const Delivery = () => {

  function deliveryDate(interval: number){
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + interval);
    const exactDay = tomorrow.toString().slice(3, 10)
    return exactDay
  }
  return (
    <>
      <div className=" text-lg md:grid lg:grid xl:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:mt-2 xl:px-5 gap-16 px-2 xl:font-normal xl:text-lg">
       <div id="section-1" className="">
        <h3 className="uppercase font-semibold text-xl mt-4">deliver & returns</h3>
        <UnorderedList className='my-2'>
          <ListItem>One delivery fee to most locations (check our Orders & Delivery page)</ListItem>
          <ListItem>Free returns within 14 days (excludes final sale, customised pieces, face masks and certain beauty products containing hazardous or flammable materials, like fragrances and aerosols)</ListItem>
          <ListItem>Integer molestie lorem at massa</ListItem>
          <ListItem>All our deliveries are climate conscious</ListItem>
        </UnorderedList>

          <h3 className="font-semibold text-xl mt-4 xl:font-medium">Import duties information</h3>
          <div className="whitespace-pre-line text-md my-2 ">
            Let us handle the legwork.
            Delivery duties are included in the item price when shipping to all EU countries (excluding the Canary Islands), plus The United Kingdom, USA, Canada, China Mainland, Australia, New Zealand, Puerto Rico, Switzerland, Singapore, Republic Of Korea, Kuwait, Mexico, Qatar, India, Norway, Saudi Arabia, Taiwan Region, Thailand, U.A.E., Japan, Brazil, Isle of Man, San Marino, Colombia, Chile, Argentina, Egypt, Lebanon, Hong Kong SAR and Bahrain. All import duties are included in your order – the price you see is the price you pay.
          </div>
       </div>
            
        <div id="section-2" className=' lg:block md:block'>
          <h3 className="font-semibold text-xl mt-4 ">Estimated delivery</h3>
          <UnorderedList className='my-2'>
            <ListItem>Express: <span className="text-md"> {deliveryDate(3)} - {deliveryDate(6)}</span></ListItem>
            <ListItem>Standard: <span className="text-md"> {deliveryDate(6)} - {deliveryDate(9)}</span> </ListItem>        
          </UnorderedList> 
          
          <div id="section-3" className='xl:hidden '>
          <h3 className="font-semibold text-xl">Need more information?</h3>
          <UnorderedList className='my-2 underline'>
            <ListItem><a href='#' className="text-md">Orders & delivery</a></ListItem>  
            <ListItem><a href="#" className="text-md">Returns & refunds</a></ListItem>
            <ListItem><a href="#" className="text-md">Duties & taxes</a></ListItem>
            <ListItem><a href='#' className="text-md">Climate conscious delivery</a></ListItem>
          </UnorderedList>
        </div>
        </div>  
        <div id="section-3" className='hidden xl:block'>
          <h3 className="font-semibold text-xl">Need more information?</h3>
          <UnorderedList className='my-2 underline'>
            <ListItem><a href='#' className="text-md">Orders & delivery</a></ListItem>  
            <ListItem><a href="#" className="text-md">Returns & refunds</a></ListItem>
            <ListItem><a href="#" className="text-md">Duties & taxes</a></ListItem>
            <ListItem><a href='#' className="text-md">Climate conscious delivery</a></ListItem>
          </UnorderedList>
        </div>
      </div>
    </>
  )
}

export default Delivery                 