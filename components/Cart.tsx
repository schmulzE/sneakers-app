import React, { useCallback, useContext } from "react"
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons";


type Props = {
  data: any[];
  handleClick: (item: any) => void;
  wishlist: any[]
} 

const Cart: React.FC<Props> = ( {data, handleClick, wishlist} ) => {

  const wishlisted = useCallback(
    (item : any) =>  wishlist.findIndex((it) => it.id == item.id) != -1
     ,
    [wishlist],
  )

  
  console.log(wishlist)
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> 
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.filter((item: { id: number }) =>  item.id).map((product: any) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 grid">
                <img
                  src={product.images?.cutOut}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75" 
                />
                <IconContext.Provider value={{style: {fontWeight: 800}, className:"h-5 w-5"}}>
                  <button className="relative justify-self-end p-2 w-9 h-9 rounded-full mt-1 mr-3 font-black" onClick={() =>{ handleClick(product);}}>
                    {!wishlisted(product) ? <BsSuitHeart/> : <BsSuitHeartFill/>}
                  </button>
                </IconContext.Provider>
              </div>
              <h3 className="mt-4 text-sm text-gray-700 font-medium">{product.brand?.name}</h3>
              <p className="mt-1 text-lg text-gray-900">{product.shortDescription}</p>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.priceInfo?.formattedFinalPrice}</p>
            </a>
          ))}

        </div>
        {/* <button className='uppercase bg-white text-black px-8 my-4 py-2 outline-none border border-slate-800 rounded block w-full'>
          shop now
        </button> */}
      </div>
      
    </div>
  )
}


export default Cart