import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from "react";
import { useCart } from "../context/CartContext"
import Form from "../components/Form";
import WishlistCart from "../components/WishlistCart"
import { useBag } from '../context/BagContext';
import { Tabs, TabList, Tab, TabPanels, TabPanel, ModalOverlay } from '@chakra-ui/react';
import Modal from '../components/Modal';
import Login from '../components/Login';
import Register from '../components/Register';

const OverlayOne = () => (
  <ModalOverlay
    bg='blackAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)'
  />
)

const Wishlist: NextPage = () => {
  const { removeItem, items} = useCart()
  const {addToBag, bag} = useBag()
  const numberOfItems = items.length
  const [popUp, setPopUp] = useState(false)
  const [overlay, setOverlay] = useState(<OverlayOne/>)
  
  const removeWishlist = (item: { id: number; }) => {
    removeItem(item.id)
  }

   const addToBagHandler = (item: { id: number; }) => {
    const foundItem =  bag.find((it: { id: number; }) => it.id === item.id )
    if(foundItem){
      return
    }else { 
      addToBag(item)
    }
  }

  const modalHandler = () => {
    setPopUp(true)
    overlay
  }

  return (
    <div className='pt-20'>
      <h1 className='font-bold tracking-wide uppercase text-center text-3xl'>wishlist</h1>
      <h3 className='uppercase text-lg text-center'>{numberOfItems} pieces</h3>

      <div className="px-4">
        <p className='text-center pt-4 md:w-3/5 md:mx-auto'>keep track of all your favourite pieces, no matter your browser or device, all in one place</p>
        
        <button onClick={modalHandler} className='capitalize font-bold bg-[#1b1b1b] text-white px-8 my-4 py-2 outline-none border rounded block w-full text-center md:w-1/2 md:mx-auto lg:w-1/2 lg:mx-auto'>
          sign up
        </button>

        <WishlistCart data={items} handleClick={removeWishlist} addToBag={addToBagHandler}/>
        <Form/>
      </div>

      {/* user sign up and login modal */}
      <Modal onOpen={popUp} setPopUp={setPopUp} overlay={overlay}>
        <Tabs >
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

export default Wishlist