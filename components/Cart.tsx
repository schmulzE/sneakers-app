import React, { useCallback, useState } from "react"
import { BsSuitHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Link from "next/link";

type Props = {
  data: any[];
  handleClick: (item: any) => void;
  wishlist: any[];
  showButton?: boolean;
  icon: JSX.Element;
} 

const Cart: React.FC<Props> = ( {data, handleClick, wishlist, showButton, icon} ) => {
  const wishlisted = useCallback(
    (item : any) =>  wishlist.findIndex((it) => it.id == item.id) != -1
     ,
    [wishlist],
  )
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> 
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.filter((item: { id: number }) =>  item.id).map((product: any) => (
            <Link key={product.id} href={{
              pathname: `/men/sneakers/${product.id}`,
              query: { images: JSON.stringify(product.images?.all) },
            }} as= {`/men/sneakers/${product.id}`}>
              <a>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 grid">
                <img
                  src={product.images?.cutOut}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
                <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-6 w-6"}}>
                  <button className="relative justify-self-end p-2 w-9 h-9 rounded-full mt-1 mr-3 font-black" onClick={() =>{ handleClick(product);}}>
                   {!wishlisted(product) ? icon : <BsSuitHeartFill/>}
                  </button>
                </IconContext.Provider>
              </div>
              <h3 className="mt-4 text-sm text-gray-700 font-medium">{product.brand?.name}</h3>
              <p className="mt-1 text-lg text-gray-900">{product.shortDescription}</p>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.priceInfo?.formattedFinalPrice}</p>
              {showButton && <button className='capitalize bg-white text-black px-4 font-medium my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full'>            
                add to bag
              </button>}
             </a> 
            </Link>
          ))}
              
        </div>
      </div>
      
    </div>
  )
}


export default Cart