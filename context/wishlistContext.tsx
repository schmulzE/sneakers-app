import{ useState, useEffect, createContext, useContext, useRef, useCallback} from 'react'

const WishlistContext = createContext({
  wishlists: [] as Sneakers[],
  addToWishlist: (item: Sneakers) => {},
  removeFromWishlist: (id: number) => {},
  resetWishlist: () => {},
})
export const useWishlist =  () => useContext(WishlistContext)


const loadJSON = (key: string) => key && JSON.parse(localStorage.getItem(key))
const saveJSON = (key: string, data: Sneakers[]) => localStorage.setItem(key, JSON.stringify(data))

const WishlistProvider = ({children}) => {
  const key ="CART_ITEMS"
  const firstRender = useRef(true)
  const [wishlists, setWishlists] = useState<Sneakers[]>([])


  useEffect(() =>{
    if(firstRender.current) {
      firstRender.current = false
      const localItems =loadJSON(key)
      localItems && setWishlists(localItems)
      return
    }
    saveJSON(key, wishlists)
  },[key, wishlists])

  const addToWishlist = useCallback((item: Sneakers)=> {
    setWishlists((items) =>  items.concat(item));
   
  },[wishlists])

  const removeFromWishlist = useCallback((id: number)=> {
    setWishlists((items: Sneakers[]) =>  items.filter((item: { id: number }) => item.id !== id));
    
  },[])

  const resetWishlist = useCallback(() => {
    setWishlists([]);
  },[])

  return (
    <WishlistContext.Provider value={{wishlists, addToWishlist, removeFromWishlist, resetWishlist}}>
    {children}
    </WishlistContext.Provider>
  )
}

export default WishlistProvider