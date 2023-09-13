import{ useState, useEffect, createContext, useContext, useRef, useCallback} from 'react'

const BagContext = createContext({
  bag: [] as Sneakers[],
  addToBag: (item: Sneakers) => {},
  removeFromBag: (id: number) => {},
  resetBag: () => {},
  totalBagItems: null as number,
})
export const useBag =  () => useContext(BagContext)


const loadJSON = (key: string) => key && JSON.parse(localStorage.getItem(key))
const saveJSON = (key: string, data: Sneakers[]) => localStorage.setItem(key, JSON.stringify(data))

const BagProvider = ({children}) => {
  const key ="BAG_ITEMS"
  const firstRender = useRef(true)
  const [bag, setBag] = useState<Sneakers[]>([])
  const [totalBagItems, setTotalBagItems] = useState(0)


  useEffect(() =>{
    if(firstRender.current) {
      firstRender.current = false
      const localItems =loadJSON(key)
      localItems && setBag(localItems)
      return
    }
    saveJSON(key, bag)
  },[key, bag])

  const addToBag = useCallback((item: Sneakers)=> {
    setBag((bag) =>  bag.concat(item));
    const updatedTotalItems = bag.length;
    setTotalBagItems(updatedTotalItems)
  },[])

  const removeFromBag = useCallback((id: number)=> {
    setBag((bag) =>  bag.filter((item: { id: number }) => item.id !== id));
    const updatedTotalItems = bag.length;
    setTotalBagItems(updatedTotalItems)
  },[])

  const resetBag = useCallback(() => {
    setBag([]);
    const updatedTotalItems = bag.length;
    setTotalBagItems(updatedTotalItems)
  },[])

  return (
    <BagContext.Provider value={{bag, addToBag, removeFromBag, resetBag, totalBagItems}}>
    {children}
    </BagContext.Provider>
  )
}

export default BagProvider