import type { NextPage } from 'next'
import React, { useState , useContext} from 'react';
import BagContext from "../../store/bag_context";
import Link from 'next/link';
import Modal from '../../components/Modal';
import Login from '../../components/Login'
import Register from '../../components/Register'
import { IconContext } from "react-icons";
import { FiInfo } from "react-icons/fi";
import { BiPhone } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineMail, AiOutlineQuestionCircle } from "react-icons/ai";
import {MdClose} from 'react-icons/md'
import Form from '../../components/Form'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';



const Bag: NextPage = () => {
 const [popUp, setPopUp] = useState(false)

 const bagCtx = useContext(BagContext)
 

 let delivery = 19
 const subTotal: number = bagCtx.items?.reduce((acc: number, curr: any) =>  {return  acc + curr.priceInfo?.finalPrice}, 0)
 const total = bagCtx.items?.reduce((acc: number, curr: any) =>  {return  acc + curr.priceInfo?.finalPrice}, delivery)

  const removeBag = (item: { id: number; }) => {
    bagCtx.removeItem(item.id)
  }

 const modalHandler = () => {
  setPopUp(true)
 }


  return (
    <div className='mx-4'>
    <div className='mt-3 mb-4'>
      <div className="text-3xl text-center uppercase font-bold">shopping bag</div>
      <p className="text-center mt-2">Never lose styles in your shopping bag again - simply login or register to save them</p>
    </div>

    <button onClick={modalHandler} className='font-semibold capitalize bg-black text-white px-8 my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full text-center'>
      go to checkout
    </button>

    <ul className='mt-10 flex flex-wrap'>
      <li className='flex my-2'>
        <div className="rounded-full h-5 w-5 flag mr-2"></div>
        <span className='text-sm'>Sending from <b>United State</b></span>
      </li>
      <li className='flex my-2'>
        <IconContext.Provider value={{ className: "h-5 w-5 mr-2" }}>
          <FiInfo/>
        </IconContext.Provider>
        <span className='text-sm'>you may have to pay import duties</span>
      </li>
    </ul>

    <hr className=' bg-neutral-900'/>

    {bagCtx.items.map((product: any) => (
      <div id="checkout-cart" key={product.id}className="grid grid-cols-2 relative">
        <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-6 w-6"}}>
            <button className="absolute right-0 top-0 justify-self-end p-2 w-9 h-9 rounded-full mt-2 font-black z-10" onClick={() =>{ removeBag(product);}}>
              <MdClose/>
            </button>
          </IconContext.Provider>
          <div id="image"><img src={product.images?.cutOut} alt={product.imageAlt} className="h-1/2 object-contain object-center pl-6"/></div>
          <div id="details" className='flex flex-wrap'>
            <div id="desc">
              <h3 className="mt-4 text-md text-neutral-900 font-bold">{product.brand?.name}</h3>
              <p className="mt-1 text-md text-gray-900">{product.shortDescription}</p>
              <p className="mt-2 text-sm text-gray-900 uppercase">Sneakfit id: {product.id}</p>
            </div>
            <div id="size" className='basis-full my-4'>
              <h2 className='capitalize'>size</h2>
              <p className="text-lg block font-semibold">38 IT</p>
            </div>
            <div id="quantity" className='my-4'>
              <h3 className='capitalize'>quantity</h3>
              <p className="text-lg font-semibold">1</p>
            </div>
          </div>
      </div>
    ))}


    <div id="table-section">
      <h2 className='font-bold'>Summary</h2>
      <table className="w-full text-md text-left text-gray-500 table-fixed">
        <tbody>
          <tr className="bg-white">
            <th scope="row" className="pb-1 pt-3 font-medium text-gray-900 whitespace-nowrap">
              Subtotal
            </th>
            <td className="py-1 text-right">
              {subTotal}
            </td>
          </tr>
          <tr className="bg-white pb-4">
            <th scope="row" className="pt-1 pb-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Delivery
            </th>
            <td className="pt-1 pb-3 text-right">
              $19
            </td>           
          </tr>
          <tr className="bg-white border-t">
            <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap">
              Total
            </th> 
            <td className="py-4 text-right">
              USD{total}
            </td>          
          </tr>
        </tbody>
      </table>
    </div>

    <Link href="/checkout">
      <a onClick={modalHandler} className=' font-semibold capitalize bg-black text-white px-8 my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full text-center'>
        go to checkout
      </a>
    </Link>

    <div id="poster1" className='bg-neutral-100 text-left py-6 px-3 my-3 w-full'>
      <h2 className='pb-3 uppercase'>free returns</h2>
      <p>Free returns within 14 days(exludes final sales, delivery charges)</p>
    </div>

    <h1>Recommendations</h1>

    <div id="poster2" className='bg-neutral-100 text-left py-6 px-3 my-3 w-full'>
      <h2 className='pb-3 capitalize font-semibold'>need help?</h2>
      <p className='text-sm'>Contact our global Customer Service team, you can reach us by phone or email. Alternatively, you may find the answer in the <a className='underline'>Frequently Asked Question page.</a></p>
      <div className="flex flex-wrap py-4">
        <div id="flex-1" className='py-3'>
          <span className="font-semibold text-lg flex ">
            <BiPhone size={25}/>
            <h2 className='pl-4'>Call us</h2>
            </span>
          <p className='underline py-2 text-sm font-bold'>+1 6573 9487</p>
          <p className='text-sm'>Available Monday to Friday, 18:00 - 21:00 EST</p>
        </div>
        <div id="flex-2" className='py-3'>
          <span className="font-semibold text-lg flex ">
            <AiOutlineMail size={25}/>
            <h2 className='pl-4'>Email us</h2>
            </span>
          <p className='text-sm underline py-2'>Click here to send us an email</p>
        </div>
        <div id="flex-3" className='py-3'>
          <span className="font-semibold text-lg flex ">
            <AiOutlineQuestionCircle size={25}/>
            <h2 className='pl-4'>FAQs</h2>
            </span>
          <p className='text-sm py-2'>Find the answers you need in our FAQs</p>
        </div>
      </div>
    </div>
    <Form/>


    <Modal onOpen={popUp} setPopUp={setPopUp}>
      <Tabs>
        <TabList>
          <Tab className='uppercase text-lg'>sign in</Tab>
          <Tab className='uppercase text-lg'>i&apos;m new here</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Login/>
          </TabPanel>
          <TabPanel>
            <Register/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Modal>
      
    </div>
  )
}

export default Bag