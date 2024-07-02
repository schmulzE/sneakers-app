import React from "react";
import { MdClose } from "react-icons/md";
import BagButton from "../bag/bagButton";
import { IconContext } from "react-icons";
import SneakerListItem from "../sneaker/sneakerListItem";


type WishlistCartItemProp = {
  sneaker: Sneakers;
  handleClick: (item: Sneakers) => void;
  addToBag: (item: Sneakers) => void;
}


const WishlistCartItem: React.FC<WishlistCartItemProp> = ({sneaker, handleClick, addToBag}) => {

  return (
    <>
      <div key={sneaker.id} className="grid">
        <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-6 w-6"}}>
          <button className="absolute justify-self-end p-2 w-9 h-9 rounded-full mt-1 mr-3 font-black z-10" onClick={() =>{ handleClick(sneaker);}}>
            <MdClose/>
          </button>
        </IconContext.Provider>
        <SneakerListItem sneaker={sneaker}/>
        
        <BagButton sneaker={sneaker} addToBag={addToBag}/>
      </div>
    </>
  )
}

export default WishlistCartItem;