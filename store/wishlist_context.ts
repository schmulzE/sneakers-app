import React from 'react'

const wishlist_context = React.createContext({
  items: [],
  totalItem: 0,
  addItem: (item: any) => {},
  removeItem: (id: number) => {},
})

export default wishlist_context