import React from 'react'

const wishlist_context = React.createContext({
  items: <any>[],
  totalItem: null,
  addItem: (item: any) => {},
  removeItem: (id: number) => {},
})

export default wishlist_context