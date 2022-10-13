import type { NextPage } from 'next'
import Link from 'next/link'
import Image from "next/image";
import { useContext } from "react";
import Pumasneakers from "../public/nike sneakers.jpg";
import Logos from "../components/Logos"
import Cart from "../components/Cart"
import Card from "../components/Card"
import { BsTag, BsQuestionCircle, BsSuitHeart } from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import Form from "../components/Form";
import options from '../client_api/options';
import WishlistContext from "../store/wishlist_context";


type MenSneakersPageProps = {
  menSneakers: any[]
  womenSneakers: any[]
}
const Home: NextPage<MenSneakersPageProps> = ( { menSneakers, womenSneakers }) => {
    const wishlistCtx = useContext(WishlistContext)

  const wishlist = wishlistCtx.items

  const handleClick = (item: { id: number; }) => {
   const foundItem =  wishlistCtx.items.find((it: { id: number; }) => it.id === item.id )
   if(foundItem) {
    wishlistCtx.removeItem(item.id)
   }else {
    wishlistCtx.addItem(item)
   }
  }

  return (
    <>
    <div className='container px-4'>
      <Image src={Pumasneakers} width={400} height={600} alt="puma sneakers"/>
      <div className='text-xl font-black uppercase text-center pt-4'>
        the new season sneakers edition
      </div>
     <Link href={{ pathname: 'men/sneakers' }}>
        <a className='uppercase bg-white text-black px-8 my-4 py-2 outline-none border border-slate-800 rounded block w-full text-center'>
          shop now
        </a>
      </Link>
    </div>
    <Logos/>
    <div className='px-4'>
      <Image src="/jordans.png" alt="" width={500} height={500}/>
    </div>
     <div className='px-4'>
    <Cart data={womenSneakers.slice(0, 4)} handleClick={handleClick} wishlist={wishlist} icon={<BsSuitHeart/>}/>
      <Link href={{ pathname: 'women/sneakers' }}>
        <a className='uppercase bg-white text-black px-8 my-4 py-2 outline-none border border-slate-800 rounded block w-full text-center'>
          shop now
        </a>
      </Link>
      <Image src="/girl on sneakers.png" alt="" width={400} height={700}/>
      <h2 className='uppercase font-bold'>walk consciously</h2>
      <p >choose your favourite from the brands new collection now</p>
    </div>
    <div className='px-2'>
    <Cart data={menSneakers.slice(0, 4)} handleClick={ handleClick } wishlist={wishlist} icon={<BsSuitHeart/>}/>
      <Link href={{ pathname: 'men/sneakers' }}>
        <a className='uppercase bg-white text-black px-8 my-4 py-2 outline-none border border-slate-800 rounded block w-full text-center'>
          shop now
        </a>
      </Link>
      <Card icon={<BsTag/>} header="HOW TO SHOP" text='your guide to shopping and placing orders'/>
      <Card icon={<BsQuestionCircle/>} header="FAQs"  text='your questions answered'/>
      <Card icon={<FaRegComment/>} header="NEED HELP?" text="contact our global Customer Service team"/>
    </div>
    <Form/>
    </>
  )
}

export async function getStaticProps() {
  // Fetch data from external API
  const [menSneakers, womenSneakers] = await Promise.all([
    fetch('https://www.farfetch.com/ng/plpslice/listing-api/products-facets?page=1&view=60&sort=3&scale=282&pagetype=Shopping&rootCategory=Men&pricetype=FullPrice&c-category=137174', options).then(r => r.json()).then(result =>  result.listingItems.items),
    fetch("https://www.farfetch.com/ng/plpslice/listing-api/products-facets?page=1&view=60&sort=3&scale=274&pagetype=Shopping&rootCategory=Women&pricetype=FullPrice&c-category=136310", options).then(r => r.json()).then(result =>  result.listingItems.items),
  ])

  // Pass data to the page via props
  return { props: { menSneakers, womenSneakers }}
}
export default Home
