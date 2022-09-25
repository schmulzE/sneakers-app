import type { NextPage } from 'next'
import Image from "next/image";
import Pumasneakers from "../public/nike sneakers.jpg";
import Logos from "../components/Logos"
import Cart from "../components/Cart"
import Card from "../components/Card"
import { BsTag, BsQuestionCircle } from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import Form from "../components/Form";

// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
    <div className='container px-4'>
      <Image src={Pumasneakers} width={400} height={600} alt="puma sneakers"/>
      <div className='text-xl font-black uppercase text-center pt-4'>
        the new season sneakers edition
      </div>
      <button className='uppercase bg-white text-black px-8 my-4 py-2 outline-none border border-current rounded block w-full'>
        shop now
      </button>
    </div>
    <Logos/>
    <div className='px-4'>
      <Image src="/jordans.png" alt="" width={500} height={500}/>
    </div>
    <Cart/>
     <div className='px-4'>
      <Image src="/girl on sneakers.png" alt="" width={400} height={700}/>
      <h2 className='uppercase font-bold'>walk consciously</h2>
      <p >choose your favourite from the bramds new collection now</p>
    </div>
    <Cart/>
    <div className='px-2'>
      <Card icon={<BsTag/>} header="HOW TO SHOP" text='your guide to shopping and placing orders'/>
      <Card icon={<BsQuestionCircle/>} header="FAQs"  text='your questions answered'/>
      <Card icon={<FaRegComment/>} header="NEED HELP?" text="contact our global Customer Service team"/>
    </div>
    <Form/>
    </>
  )
}

export default Home
