import type { GetStaticPropsContext, NextPage } from 'next'
import { useState, useReducer, useMemo } from "react";
import { BsFilter } from "react-icons/bs";
import { IconContext } from "react-icons";
import Pagination from '../../../components/Pagination';
import Modal from '../../../components/Modal';
import RangeInput from '../../../components/RangeInput';
import options from '../../../client_api/options';


type MenSneakersPageProps = {
  result: any[]
}

const Categories= ['Hi-Tops', 'Low-Tops', 'Slip-On']

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

const Home: NextPage<MenSneakersPageProps> = ({ result }) => {
  const [fetchedData, setFetchData] = useState(result)
  const [filteredData, setFilteredData] = useState<any>([])
  const [categoryData, setCategoryData] = useState<any>([])
  const [modal, dispatch] = useReducer(reducer, initialState)

   const brandList = useMemo(() => {
   const arr: string[] = [];
    for (let i = 0; i < result.length; i++) {
      if (!arr.includes(result[i].brand?.name))
      arr.push(result[i].brand?.name);
    }
    return arr;
  }, [result])
  
   const sortHighHandler = () => {
    const sortedLowToHigh =  fetchedData.sort((x, y) => y.priceInfo?.finalPrice - x.priceInfo?.finalPrice)
    setFetchData((current) => [ ...current, sortedLowToHigh])
  }

  const sortLowHandler = () => {
    const sortedLowToHigh =  fetchedData.sort((x, y) => x.priceInfo?.finalPrice - y.priceInfo?.finalPrice)
    setFetchData((current) => [ ...current, sortedLowToHigh])
  }

  const filterBrandHandler = (event: any) => {
    const { value, checked } = event;     
    if (checked) {
      const filterByBrand = fetchedData.filter(item => item.brand?.name == value)
      setCategoryData((current: any) => current.concat(filterByBrand))
    }else {
      setCategoryData((current: any) => current.filter((item: { brand: { name: any; }; }) => item.brand?.name !== value))
    }
  }


  const filterCategoryHandler = (event: any) => {
    const { value, checked } = event;   
    if (checked) {
      const filterCategory = result.filter(item => item.shortDescription.includes(value))
      setFilteredData((current: any) => current.concat(filterCategory))
    }else {
      setFilteredData((current: any) => current.filter((item: { shortDescription: string | any[]; }) => item.shortDescription.includes(value)))
    }
  }

  const filtered = useMemo(() => {
    return filteredData === undefined || filteredData.length == 0 ? fetchedData : filteredData
  }, [filteredData, fetchedData])

  return (
    <div className='px-2'>
      <IconContext.Provider value={{ className: "global-class-name h-8 w-8" }}>
        <button onClick={() =>  dispatch({ type:'showModal1', value: true})} className='capitalize flex justify-center align-center bg-st my-4 py-1 outline-none border border-slate-800 rounded block w-full'>
          <BsFilter/>
          <span className='text-xl font-medium'>Filter</span>
        </button> 
      </IconContext.Provider>
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
            <input className="mr-2" type='checkbox' id='brand' value={item} name='brand' onChange={(e) => filterBrandHandler(e.target)}/>
            {item}
            </li>
          </ul>
        ))}
      </Modal>
      <Modal onOpen={modal.thirdModal} setPopUp={() =>  dispatch({ type:'closeModal3', value: false})}>
        <h2 className='text-2xl border-bottom border-b-4 border-black w-21 font-semibold pb-2'>Category</h2>
        <hr/>
          {Categories.map((item, index) => (        
            <ul className='mt-6' key={index}>
              <li className='my-6'>
              <input className="mr-2" type='checkbox' id='brand' value={item} name='brand' onChange={(e) => filterCategoryHandler(e.target)}/>
              {item}
              </li>
            </ul>
          ))}
      </Modal>
      <Modal onOpen={modal.fourthModal} setPopUp={() =>  dispatch({ type:'closeModal4', value: false})}>
        <h2 className='text-2xl border-bottom border-b-4 border-black w-20 font-semibold pb-2'>Price</h2>
        <hr/>
        <RangeInput/>
      </Modal>
      <Pagination data={filtered} title="" pageLimit={2} dataLimit={30}/>
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
  return { props: { result } }

}

export default Home