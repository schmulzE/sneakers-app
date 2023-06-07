import React, { useCallback } from "react"
import { BsSuitHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Link from "next/link";

type Props = {
  data: any[];
  handleClick: (item: any) => void;
  wishlist: any[];
  icon: JSX.Element;
} 

const Cart: React.FC<Props> = ( {data, handleClick, wishlist, icon } ) => {

  const wishlisted = useCallback(
    (item : any) =>  wishlist.findIndex((it) => it.id == item.id) != -1
     ,
    [wishlist],
  )

  return (
    <div className="bg-white">
      <div className="mx-auto md:max-w-4xl max-w-2xl py-8 md:py-3 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> 
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {data?.filter((item: { id: number }) =>  item.id).map((product: any) => (
            <div key={product.id} className="grid">
            <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-6 w-6"}}>
              <button className="relative justify-self-end p-2 w-9 h-9 rounded-full mt-1 mr-3 font-black " onClick={() =>{ handleClick(product);}}>
                {!wishlisted(product) ? icon : <BsSuitHeartFill/>}
              </button>
            </IconContext.Provider>
            <Link  href={{
              pathname: `/men/sneakers/${product.id}`,
              query: { item: JSON.stringify(product) },
            }} as= {`/men/sneakers/${product.id}`}>
              <a>
              <div className="aspect-w-1 aspect-h-1 w-full h-40 overflow-hidden bg-white xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.images?.cutOut}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 p-3"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 font-medium">{product.brand?.name}</h3>
              <p className="mt-1 text-lg text-gray-900">{product.shortDescription}</p>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.priceInfo?.formattedFinalPrice}</p>
              </a> 
              </Link> 
            </div>
          ))}
              
        </div>
      </div>
      
    </div>
  )
}


export default Cart