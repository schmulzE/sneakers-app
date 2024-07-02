import React, { useCallback } from 'react';
import { IconContext } from 'react-icons';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { useWishlist } from '../../context/wishlistContext';

const WishlistButton = ({ sneaker, handleClick}) => {
  const { wishlists } = useWishlist();

  const wishlisted = useCallback(
    (item : Sneakers) =>  wishlists.findIndex((it) => it.id == item.id) != -1
      ,
    [wishlists],
  )
  return(
    <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-6 w-6 z-50"}}>
      <button className="p-2 rounded-full mt-1 mr-2 font-black absolute top-2 right-0 z-50" onClick={() =>{ handleClick(sneaker);}}>
        {!wishlisted(sneaker) ? <BsSuitHeart/> : <BsSuitHeartFill/>}
      </button>
    </IconContext.Provider>
  );
}
export default WishlistButton;
