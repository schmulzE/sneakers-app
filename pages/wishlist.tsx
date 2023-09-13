import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useContext, useState } from "react";
import { useCart } from "../context/CartContext"
import Form from "../components/Form";
import WishlistCart from "../components/WishlistCart"
import { useBag } from '../context/BagContext';

const Wishlist: NextPage = () => {
  const { removeItem, items} = useCart()
  const {addToBag, bag} = useBag()
  const numberOfItems = items.length
  
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

  return (
    <div className='pt-12'>
      <h1 className='font-bold tracking-wide uppercase text-center text-3xl'>wishlist</h1>
      <h3 className='uppercase text-lg text-center'>{numberOfItems} pieces</h3>

      <div className="px-4">
        <p className='text-center pt-4 md:w-3/5 md:mx-auto'>keep track of all your favourite pieces, no matter your browser or device, all in one place</p>
        
        <Link href={{ pathname: 'men/sneakers' }}>
          <a className='uppercase bg-black text-white px-8 my-4 py-2 outline-none border border-slate-800 rounded block w-full text-center md:w-2/5 md:mx-auto lg:w-1/2 lg:mx-auto'>
            sign up
          </a>
        </Link>

        <WishlistCart data={items} handleClick={removeWishlist} addToBag={addToBagHandler}/>
        <Form/>
      </div>
    </div>
  )
}

export default Wishlist