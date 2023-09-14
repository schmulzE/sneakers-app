import React, { useCallback, useContext } from "react"
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";
import Link from "next/link";
import { useBag } from '../context/BagContext';


type Props = {
  data: Sneakers[];
  handleClick: (item: Sneakers) => void;
  addToBag: (item: Sneakers) => void;
} 

const WishlistCart: React.FC<Props> = ( {data, handleClick, addToBag } ) => {
  const {bag} = useBag()
  
  const baggedItem = useCallback(
    (item: Sneakers) =>  bag.findIndex((it: { id: number; }) => it.id == item.id) != -1
     ,
    [bag],
  )
  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> 
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.filter((item: { id: number }) =>  item.id).map((product: Sneakers) => (
            <div key={product.id} className="grid">
            <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-6 w-6"}}>
              <button className="relative justify-self-end p-2 w-9 h-9 rounded-full mt-1 mr-3 font-black z-10" onClick={() =>{ handleClick(product);}}>
                <MdClose/>
              </button>
            </IconContext.Provider>
            <Link  href={{
              pathname: `/men/sneakers/${product.id}`,
              query: { item: JSON.stringify(product) },
            }} as= {`/men/sneakers/${product.id}`}>
              <a>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 grid">
                <img
                  src={product.images?.cutOut}
                  alt={product.shortDescription}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 font-medium">{product.brand?.name}</h3>
              <p className="mt-1 text-lg text-gray-900">{product.shortDescription}</p>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.priceInfo?.formattedFinalPrice}</p>
              </a> 
              </Link>
              {!baggedItem(product) ? <button onClick={() => {addToBag(product)}} className='capitalize bg-white text-black px-4 font-medium my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full'>            
                add to bag
              </button> :
              <a className='capitalize text-center bg-neutral-900 text-white px-4 font-medium my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full'>            
                in your bag
              </a>}
            </div>
          ))}
              
        </div>
      </div>
      
    </div>
  )
}


export default WishlistCart