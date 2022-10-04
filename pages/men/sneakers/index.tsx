import type { NextPage } from 'next'
import { BsFilter } from "react-icons/bs";
import { IconContext } from "react-icons";
import Pagination from '../../../components/Pagination';
import options from '../../../client_api/options';

type MenSneakersPageProps = {
  result: any[]
}

const MenSneakers: NextPage<MenSneakersPageProps> = ({ result }) => {
  
  // console.log(result)

  return (
    <div className='px-2'>
      <IconContext.Provider value={{ className: "global-class-name h-8 w-8", }}>
        <button className='capitalize flex justify-center align-center bg-st my-4 py-1 outline-none border border-slate-800 rounded block w-full'>
          <BsFilter/>
          <span className='text-xl font-medium'>Filter</span>
        </button> 
      </IconContext.Provider>
      <Pagination data={result} title="" pageLimit={2} dataLimit={30}/>
    </div>
  )
}

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API

  const res = await fetch('https://www.farfetch.com/ng/plpslice/listing-api/products-facets?page=1&view=60&sort=3&scale=282&pagetype=Shopping&rootCategory=Men&pricetype=FullPrice&c-category=137174', options)
  const data = await res.json()
  const result = data.listingItems.items
  result

  // Pass data to the page via props
  return { props: { result } }

}

export default MenSneakers