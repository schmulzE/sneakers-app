import React from 'react'

const bag_context = React.createContext({
  items: <any>[],
  totalItem: null,
  addItem: (item: any) => {},
  removeItem: (id: number) => {},
})

export default bag_context