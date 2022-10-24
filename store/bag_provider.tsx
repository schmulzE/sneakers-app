import React, { useReducer } from "react";
import BagContext from './bag_context'

const defaultbagState = {
  items: [],
  totalItem: 0
}

const wishlistReducer = (state: any, action: any) => {
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


  return defaultbagState;
}

interface Props{
  children: React.ReactNode
}

const BagProvider: React.FC<Props> = ({children}) => {
  const [bagState, dispatchbag] = useReducer(wishlistReducer, defaultbagState)

  const addTobagHandler = (item: any) => {
    dispatchbag({type: "ADD", item: item})
  }

  const removeFrombag = (id: number) => {
    dispatchbag({type: "REMOVE", id: id})
  }

  const bagContext = {
    items: bagState.items,
    totalItem: bagState.totalItem,
    addItem: addTobagHandler,
    removeItem: removeFrombag
  }
 return(
  <BagContext.Provider value={bagContext}>
    {children}
  </BagContext.Provider>
 )
}

export default BagProvider