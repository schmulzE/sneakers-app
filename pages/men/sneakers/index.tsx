import type { NextPage } from 'next'
import { SetStateAction, useState, useReducer, useRef, useMemo } from "react";
import { BsFilter } from "react-icons/bs";
import { IconContext } from "react-icons";
import Pagination from '../../../components/Pagination';
import Modal from '../../../components/Modal';
import options from '../../../client_api/options';


type MenSneakersPageProps = {
  result: any[]
}

 const initialState = {
  firstModal: false,
  secondModal: false,
  // thirdModal: false,
  // fourthModal: false
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
    default:
      return state;
  }
 }

const MenSneakers: NextPage<MenSneakersPageProps> = ({ result }) => {
  const [fetchedData, setFetchData] = useState(result)
  const [filteredData, setFilteredData] = useState<any>([])
  const [modal, dispatch] = useReducer(reducer, initialState)

  const listOfBrands = function() {

    const arr: string[] = [];
    for (let i = 0; i < result.length; i++) {
      if (!arr.includes(result[i].brand?.name))
      arr.push(result[i].brand?.name);
    }
    return arr;
  };
  const brandList = listOfBrands()

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
    // console.log(`${value} is ${checked}`);
    
    if (checked) {
      const filterByBrand = fetchedData.filter(item => item.brand?.name == value)
      setFilteredData((current: any) => current.concat(filterByBrand))
    }else {
      setFilteredData((current: any) => current.filter((item: { brand: { name: any; }; }) => item.brand?.name !== value))
    }
  }

  const filtered = useMemo(() => {
    return filteredData === undefined || filteredData.length == 0 ? fetchedData : filteredData
  }, [filteredData, fetchedData])
  console.log(filtered)

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
          <li className='mb-6'>Category</li>
          <li className='mb-6'>Price</li>
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
      <Pagination data={filtered} title="" pageLimit={2} dataLimit={30}/>
    </div>
  )
}

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API

  const res = await fetch('https://www.farfetch.com/ng/plpslice/listing-api/products-facets?page=1&view=60&sort=3&scale=282&pagetype=Shopping&rootCategory=Men&pricetype=FullPrice&c-category=137174', options)
  const data = await res.json()
  const result = data.listingItems.items

  // Pass data to the page via props
  return { props: { result } }

}

export default MenSneakers