import React, { useReducer } from "react";
import WishlistContext from './wishlist_context'

const defaultWishlistState = {
  items: [],
  totalItem: 0
}

const cartReducer = (state: any, action: any) => {
  if(action.type === 'ADD'){
    const updatedItems = state.items.concat(action.item)
    const updatedTotalItems = updatedItems.length
    return{
      items: updatedItems,
      totalItem: updatedTotalItems
    }
  }

  if(action.type === 'REMOVE'){
    // const updatedItems = state.items.findIndex((item: { id: number; }) => item.id != action.item.id)
    const updatedItems = state.items.filter((item: any) => item.id !== action.id)
    const updatedTotalItems = updatedItems.length
    return {
      items: updatedItems,
      totalItem: updatedTotalItems
    }
  }


  return defaultWishlistState;
}

interface Props{
  children: React.ReactNode
}

const WishlistProvider: React.FC<Props> = ({children}) => {
  const [wishlistState, dispatchWishlist] = useReducer(cartReducer, defaultWishlistState)

  const addToWishlistHandler = (item: any) => {
    dispatchWishlist({type: "ADD", item: item})
  }

  const removeFromWishlist = (id: number) => {
    dispatchWishlist({type: "REMOVE", id: id})
  }

  const wishlistContext = {
    items: wishlistState.items,
    totalItem: wishlistState.totalItem,
    addItem: addToWishlistHandler,
    removeItem: removeFromWishlist
  }
 return(
  <WishlistContext.Provider value={wishlistContext}>
    {children}
  </WishlistContext.Provider>
 )
}

export default WishlistProvider