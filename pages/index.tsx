import type { NextPage } from 'next'
import Image from "next/image";
import Pumasneakers from "../public/the-dk-photography-NUoPWImmjCU-unsplash.jpg";
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className='container px-4'>
      {/* <img src="Pumasneakers" alt="" className={styles.img}/> */}
      <Image src={Pumasneakers} width={600} height={500} alt="puma sneakers"/>  
    </div>
  )
}

export default Home
