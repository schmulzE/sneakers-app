import React from "react";
import WishlistCartItem from "./wishlistCartItem";

type Props = {
  data: Sneakers[];
  handleClick: (item: Sneakers) => void;
  addToBag: (item: Sneakers) => void;
} 

const WishlistCart: React.FC<Props> = ( {data, handleClick, addToBag } ) => {
  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> 
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.filter((item: { id: number }) =>  item.id).map((sneaker: Sneakers, index) => (
            <WishlistCartItem key={index} sneaker={sneaker} handleClick={handleClick} addToBag={addToBag}/>
          ))}       
        </div>
      </div>
      
    </div>
  )
}


export default WishlistCart;