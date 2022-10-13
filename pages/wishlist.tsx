import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useContext, useState } from "react";
import WishlistContext from "../store/wishlist_context";
import { MdClose } from "react-icons/md";
import Form from "../components/Form";
import Cart from "../components/Cart"

const Wishlist: NextPage = () => {
  const [showButton, setShowButton] = useState(true)
  const wishlistCtx = useContext(WishlistContext)
  const numberOfItems = wishlistCtx.items.length
  
  const handleClick = (item: { id: number; }) => {
    wishlistCtx.removeItem(item.id)
  }

  return (
    <div className='pt-12'>
      <h1 className='font-bold tracking-wide uppercase text-center text-3xl'>wishlist</h1>
      <h3 className='uppercase text-lg text-center'>{numberOfItems} pieces</h3>

      <div className="px-4">
        <p className='text-center pt-4'>keep track of all your favourite pieces, no matter your browser or device, all in one place</p>
        
        <Link href={{ pathname: 'men/sneakers' }}>
          <a className='uppercase bg-black text-white px-8 my-4 py-2 outline-none border border-slate-800 rounded block w-full text-center'>
            sign up
          </a>
        </Link>

        <Cart data={wishlistCtx.items} handleClick={handleClick} showButton={showButton} icon={<MdClose />} wishlist={[]}/>
        <Form/>
      </div>
    </div>
  )
}

export default Wishlist