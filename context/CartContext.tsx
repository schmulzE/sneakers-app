import{ useState, useEffect, createContext, useContext, useRef, useCallback} from 'react'

const CartContext = createContext({
  items: [] as Sneakers[],
  addItem: (item: Sneakers) => {},
  removeItem: (id: number) => {},
  resetCart: () => {},
})
export const useCart =  () => useContext(CartContext)


const loadJSON = (key: string) => key && JSON.parse(localStorage.getItem(key))
const saveJSON = (key: string, data: Sneakers[]) => localStorage.setItem(key, JSON.stringify(data))

const CartProvider = ({children}) => {
  const key ="CART_ITEMS"
  const firstRender = useRef(true)
  const [items, setItems] = useState<Sneakers[]>([])


  useEffect(() =>{
    if(firstRender.current) {
      firstRender.current = false
      const localItems =loadJSON(key)
      localItems && setItems(localItems)
      return
    }
    saveJSON(key, items)
  },[key, items])

  const addItem = useCallback((item: Sneakers)=> {
    setItems((items) =>  items.concat(item));
   
  },[items])

  const removeItem = useCallback((id: number)=> {
    setItems((items: Sneakers[]) =>  items.filter((item: { id: number }) => item.id !== id));
    
  },[])

  const resetCart = useCallback(() => {
    setItems([]);
  },[])

  return (
    <CartContext.Provider value={{items, addItem, removeItem, resetCart}}>
    {children}
    </CartContext.Provider>
  )
}

export default CartProvider