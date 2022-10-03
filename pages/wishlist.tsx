import type { NextPage } from 'next'
import React, {useEffect, useState} from "react";
// import Cart from "../components/Cart"

const Wishlist: NextPage = () => {
  const [wishlist, setWishlist] = useState<any[]>([])

  useEffect(() => {
  const wishlistData = JSON.parse(localStorage.getItem('wishlist')!);
  if (wishlistData) {
   setWishlist(wishlistData);
  } 
  }, [])
  console.log(wishlist)
  return (
    <div>
      <h2>wishlist</h2>
      {/* <Cart/> */}
    </div>
  )
}

export default Wishlist