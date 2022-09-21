import type { NextPage } from 'next'
import Image from "next/image";
import Pumasneakers from "../public/the-dk-photography-NUoPWImmjCU-unsplash(1).jpg";
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className='container px-4'>
      <Image src={Pumasneakers} width={400} height={400} alt="puma sneakers"/>
      <div className='text-xl font-black uppercase text-center pt-4'>
        the new season sneakers edition
      </div>
      <button className='uppercase bg-black text-white px-8 py-2 outline-none rounded-full'>
        shop now
      </button>
    </div>
  )
}

export default Home
