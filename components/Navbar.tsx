import React, {useContext, useState} from 'react'
import Image from "next/image";
import Head from 'next/head';
import Link from 'next/link';
import WishlistContext from "../store/wishlist_context";
import BagContext from "../store/bag_context";
import Modal from "./Modal"

import { IconContext } from "react-icons";
import { BsHandbag, BsSuitHeart } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from 'react-icons/fa';
import Register from './Register';
import Login from './Login';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Menu, MenuButton, MenuDivider, MenuItem, MenuList, ModalOverlay } from '@chakra-ui/react';

const NavMenu = () => {
  return (
    <Menu >
      <MenuButton
        // px={3}
        // py={4}
        transition='all 0.2s'
        _hover={{ bg: 'transparent' }}
        _expanded={{ bg: 'transparent' }}
        _focus={{ boxShadow: 'transparent' }}
      >
        <AiOutlineMenu size={26} />
      </MenuButton>
      <MenuList zIndex={2}  _focus={{ boxShadow: 'transparent' }}>
        <MenuItem>Men</MenuItem>
        <MenuItem>Women</MenuItem>
        <MenuItem>Kids</MenuItem>
        <MenuItem>New Arrivals</MenuItem>
      </MenuList>
    </Menu>
  )
}

const OverlayOne = () => (
  <ModalOverlay
    bg='blackAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)'
  />
)
const Navbar = () => {
  const wishlistCtx = useContext(WishlistContext)
  const bagCtx = useContext(BagContext)
  const [popUp, setPopUp] = useState(false)
  const [overlay, setOverlay] = useState(<OverlayOne />)


  const totalWishlist = wishlistCtx.items.length
  const totalbagItem = bagCtx.items.length
   const modalHandler = () => {
    setPopUp(true)
    setOverlay(<OverlayOne />)
  }

  return (
    <>
    <Head>
      <title>Sneakfit</title>
      <meta name="description" content="Generated by create next app"/>
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <nav className="bg-white border-gray-200 px-1 md:px-2 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto md:basis-full w-full xl:container xl:mx-auto">
          <div className="hidden md:hidden md:w-auto lg:block"  id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border- xl:text-lg md:bg-white">
              <li>
                <Link href={'/men/sneaker'}>
                  <a className="block py-2 pr-4 pl-3 text-white bg-slate-700 rounded md:bg-transparent md:text-slate-700 md:p-0" aria-current="page">Men</a>
                </Link>
              </li>
              <li>
                <Link href={'/women/sneaker'}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-700 md:p-0">Women</a>
                </Link>
              </li>
              <li>
                <Link href={'/kid/sneaker'}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-700 md:p-0">Kids</a>
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-700 md:p-0">New Arrivals</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='lg:hidden xl:hidden'>
            {/* <IconContext.Provider value={{ className: "w-7 h-7" }}>
            <button onClick={modalHandler} type="button" className="p-1 mr-4 text-2xl rounded-lg focus:outline-none  focus:transparent">
              <AiOutlineMenu />
            </button>
            </IconContext.Provider> */}

            <NavMenu/>
            
            <IconContext.Provider value={{ className: "w-6 h-6" }}>
            <button type="button" className="ml-2 text-xl rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <FiSearch/>
            </button>
            </IconContext.Provider>

          </div>
          <Link href="/">
              <img src="/SNEAKFIT.svg" alt="Sneakfit Logo" className='lg:mr-40 w-24 md:w-36 lg:w-48'/>
          </Link>
          <div className='flex'>
            <button onClick={modalHandler} type="button" className="relative p-1 mr-5 text-2xl rounded-lg focus:outline-none hidden lg:block focus:ring-2 focus:ring-transparent">
              <FaRegUser fontSize={22} />
            </button>
           
            <Link href='/wishlist'>
              <button type="button" className="relative p-1 rounded-lg lg:mr-5 mr-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-transparent">
                <BsSuitHeart fontSize={22}/>
                <div className="inline-flex absolute -bottom-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-black">{totalWishlist}</div>
              </button>
            </Link>
            <Link href='/checkout/bag'>
            <button type="button" className="relative p-1 rounded-lg lg:mr-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-transparent" >
              <BsHandbag fontSize={22}/>
              <div className="inline-flex absolute -bottom-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-black">{totalbagItem}</div>
            </button>
            </Link>
          </div>
        </div>
      </nav>
      <Modal onOpen={popUp} setPopUp={setPopUp} overlay={overlay}>
        <Tabs >
          <TabList>
            <Tab className='uppercase text-lg'>sign in</Tab>
            <Tab className='uppercase text-lg'>i&apos;m new here</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Register/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Modal>
    </>
  )
}

export default Navbar