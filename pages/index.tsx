import type { NextPage } from 'next'
import Image from "next/image";
import Pumasneakers from "../public/nike sneakers.jpg";
import Logos from "../components/Logos"
import Cart from "../components/Cart"
// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
    <div className='container px-4'>
      <Image src={Pumasneakers} width={400} height={600} alt="puma sneakers"/>
      <div className='text-xl font-black uppercase text-center pt-4'>
        the new season sneakers edition
      </div>
      <button className='uppercase bg-white text-black px-8 my-4 py-2 outline-none border-2 border-current rounded block w-full'>
        shop now
      </button>
    </div>
    <Logos/>
    <div className='px-4'>
      <Image src="/jordans.png" alt="" width={500} height={500}/>
    </div>
    <Cart/>
    </>
  )
}

export default Home
