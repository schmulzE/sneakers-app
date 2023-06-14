import type { GetStaticPropsContext, NextPage } from 'next'
import { useState, useReducer, useMemo, useEffect, useCallback } from "react";
import { BsFilter } from "react-icons/bs";
import { IconContext } from "react-icons";
import Pagination from '../../../components/Pagination';
import Modal from '../../../components/Modal';
import Filter from '../../../components/Filter';
import RangeInput from '../../../components/RangeInput';
import options from '../../../client_api/options';
// import { motion } from 'framer-motion';
import Sort from '../../../components/Sort';
import Form from '../../../components/Form';



type MenSneakersPageProps = {
  result: any[],
  name: string
}

const categories = [
 'high-top',
 'low-top',
 'lace-up'
]

 const initialState = {
  firstModal: false,
  secondModal: false,
  thirdModal: false,
  fourthModal: false
 };

 const reducer = (state: any, action: { value : boolean, type: string}) => {
  switch (action.type) {
    case 'showModal1':
      return {...state, firstModal: state.firstModal = action.value}
    case 'closeModal1':
      return {...state, firstModal: state.firstModal = action.value}
    case 'showModal2':
      return {...state, secondModal: state.secondModal = action.value}
    case 'closeModal2':
      return {...state, secondModal: state.secondModal = action.value}
    case 'showModal3':
      return {...state, thirdModal: state.thirdModal = action.value}
    case 'closeModal3':
      return {...state, thirdModal: state.thirdModal = action.value}
    case 'showModal4':
      return {...state, fourthModal: state.fourthModal = action.value}
    case 'closeModal4':
      return {...state, fourthModal: state.fourthModal = action.value}
    default:
      return state;
  }
 }

const Home: NextPage<MenSneakersPageProps> = ({ result, name }) => {
  const [modal, dispatch] = useReducer(reducer, initialState)

  const [state, setState] = useState({
    products: result,
    filters: new Set(),
  })
  
  const brandList = useMemo(() => {
   const arr: string[] = [];
    for (let i = 0; i < result.length; i++) {
      if (!arr.includes(result[i].brand?.name))
      arr.push(result[i].brand?.name);
    }
    return arr;
  }, [result])
  

  const filterBrandHandler = useCallback((event) => {
    setState(previousState => {
      let filters = new Set(previousState.filters)
      let products = result

      if (event.target.checked) {
        filters.add(event.target.value)
      } else {
        filters.delete(event.target.value)
      }
      if (filters.size) {
        products = products.filter(product => {
          return filters.has(product?.brand?.name)
        })
      }
      return {
        filters,
        products,
      }
    })
  }, [setState])

  const sortHighHandler = useCallback(() => {
   setState(previousState => {
    let filters = new Set(previousState.filters)
     let sortedLowToHigh = previousState.products.sort((x, y) => y.priceInfo?.finalPrice - x.priceInfo?.finalPrice)
     let products = sortedLowToHigh
     return {
      products,
      filters
     } 
    })
  }, [setState])

  const sortLowHandler = useCallback(() => {
   setState(previousState => {
    let filters = new Set(previousState.filters)
     let sortedLowToHigh = previousState.products.sort((x, y) => x.priceInfo?.finalPrice - y.priceInfo?.finalPrice)
     let products = sortedLowToHigh
     return {
      products,
      filters
     } 
    })
  }, [setState])

  const handleFilterChange = useCallback((event, params: string) => {
    setState(previousState => {
      let filters = new Set(previousState.filters)
      let products = result.map(item => {
        if (item.shortDescription?.includes("high-top")){
          return ({...item, category: "high-top"})
        }else if(item.shortDescription?.includes("low-top")){
          return({...item, category: "low-top"})
        }else if(item.shortDescription?.includes("lace-up")){
          return ({...item, category: "lace-up"})
        }else {
          return item
        }
      })

      if (event.target.checked) {
        filters.add(event.target.value)
      } else {
        filters.delete(event.target.value)
      }
      
      if (filters.size) {
        products = products.filter(product => {
          return filters.has(product?.category)
        })
      }
      return {
        filters,
        products,
      }
    })
  }, [setState])

  return (
    <div className='px-2'>
      <IconContext.Provider value={{ className: "global-class-name h-8 w-8" }}>
        <button onClick={() =>  dispatch({ type:'showModal1', value: true})} className='md:w-2/5 md:mx-auto w-full capitalize flex justify-center align-center my-3 py-1 outline-none border border-slate-800 rounded lg:hidden'>
          <BsFilter/>
          <span className='text-xl font-medium'>Filter</span>
        </button> 
      </IconContext.Provider>

      <div className="mx-2 mt-8">
      <div className="md:text-4xl uppercase font-bold text-3xl my-2">designer sneakers for {name}</div>
      <p className="leading-1 text-md">Start your sneaker search on Farfetch. From the world’s rarest sneakers for men courtesy of Stadium Goods to the latest cult styles, discover the icons of yesterday, today, and tomorrow. We’re talking Balenciaga Triple S, Nike Air Max and of course we’re still kicking it old school with Vans and Converse.</p>
      </div>

      <div className="hidden lg:flex justify-between my-6">
        <Filter categories={categories} brandList={brandList} onFilterChange={(e) => handleFilterChange(e, "category")} filterBrandHandler={(e) => filterBrandHandler(e)} fetchedData={state.products} setFilteredData={setState}/>
        <Sort sortLowHandler={sortLowHandler} sortHighHandler={sortHighHandler}/>
      </div>


      <Pagination data={state.products} title="" pageLimit={2} dataLimit={49}/>
      <Modal onOpen={modal.firstModal} setPopUp={() =>  dispatch({ type:'closeModal1', value: false})}>
        <h2 className='text-2xl border-bottom border-b-4 border-black w-20 font-semibold pb-2'>Sort by</h2>
        <hr/>
        <ul className="my-6">
          <li className='mb-6'>
            <input className="mr-2" type="radio" id='low' value='low' name='price' onClick={sortLowHandler}/>
            <label className=' mr-3' htmlFor='low'>Price: low to high</label>       
          </li>
          <li>
            <input className="mr-2" type="radio" id='high' value='high' name='price' onClick={sortHighHandler}/>
            <label className=' mr-3' htmlFor='high'>Price: high to low</label>       
          </li>
        </ul>
        <h2 className='text-2xl border-bottom border-b-4 border-black w-20 font-semibold pb-2 mt-8 tracking-wider'>Filters</h2>
        <hr/>
        <ul className='font-bold my-6'>
          <li className='mb-6'>
            <button onClick={() =>  dispatch({ type:'showModal2', value: true})}>
              Brand
            </button>
            </li>
          <li className='mb-6'>
            <button onClick={() =>  dispatch({ type:'showModal3', value: true})}>
              Category
            </button>
          </li>
          <li className='mb-6'>
            <button onClick={() =>  dispatch({ type:'showModal4', value: true})}>
              Price
            </button>
          </li>
        </ul>
      </Modal>
      <Modal onOpen={modal.secondModal} setPopUp={() =>  dispatch({ type:'closeModal2', value: false})}>
        <h2 className='text-2xl border-bottom border-b-4 border-black w-20 font-semibold pb-2'>Brands</h2>
        <hr/>
        {brandList.sort().filter(item => item !== undefined).map((item, index) => (        
          <ul className='mt-6' key={index}>
            <li className='my-6'>
            <input className="mr-2" type='checkbox' id={item} value={item} onChange={(e) => filterBrandHandler(e.target)}/>
            <label htmlFor={item}>{item}</label>
            </li>
          </ul>
        ))}
      </Modal>
      <Modal onOpen={modal.thirdModal} setPopUp={() =>  dispatch({ type:'closeModal3', value: false})}>
        <h2 className='text-2xl border-bottom border-b-4 border-black w-21 font-semibold pb-2'>Category</h2>
        <hr/>
          {categories.map((item, index) => (        
            <ul className='mt-6' key={index}>
              <li className='my-6'>
                <input className="mr-2" type='checkbox' id={item} value={item} onChange={(e) => handleFilterChange(e, "category")}/>
                <label htmlFor={item}>{item}</label>
              </li>
            </ul>
          ))}
      </Modal>
      <Modal onOpen={modal.fourthModal} setPopUp={() =>  dispatch({ type:'closeModal4', value: false})}>
        <h2 className='text-2xl border-bottom border-b-4 border-black w-20 font-semibold pb-2'>Price</h2>
        <hr/>
        <RangeInput
          initialMin={21}
          initialMax={42850}
          min={21}
          max={42850}
          step={100}
          priceCap={1000}
          fetchedData={state.products}
          setFiltered={setState}
        />
      </Modal>
     <Form/>
    </div>
  )
}

export async function getStaticPaths(){
 return {
  paths: [
    {
      params: {
        name: 'men'
      }
    },
    {
      params: {
        name: 'women',
      }
    }
  ],
  fallback: false
 }
}

// This gets called on every request
export async function getStaticProps(context: GetStaticPropsContext) {
  const name = context.params!.name
 
  let category: string;
  let scale: string;
  if(name === "men") {
    category = "137174"
    scale = '282'
    console.log(category)
  }else {
    category = "136310"
    scale = '274'
    console.log(category)
  }



  // Fetch data from external API

  const res = await fetch(`https://www.farfetch.com/ng/plpslice/listing-api/products-facets?page=1&view=60&sort=3&scale=${scale}&pagetype=Shopping&rootCategory=${name}&pricetype=FullPrice&c-category=${category}`, options)
  const data = await res.json()
  const result = data.listingItems.items

  // Pass data to the page via props
  return { props: { result, name } }

}

export default Home