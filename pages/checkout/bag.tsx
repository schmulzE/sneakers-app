import type { NextPage } from 'next'
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from '../../components/Modal';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AuthForm from '../../components/AuthForm'
import { FcGoogle } from "react-icons/fc";
import { FiInfo } from "react-icons/fi";
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useSession, signIn, signOut } from "next-auth/react"



const Bag: NextPage = () => {
 const [popUp, setPopUp] = useState(false)
 const [form, setForm] = useState({
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: ''
 })

 const modalHandler = () => {
  setPopUp(true)
 }

 const googleSigningHandler = async() => {
  signIn('google', { callbackUrl: 'http://localhost:3000/'})
 }
  return (
    <div className='mx-4'>
    <div className='mt-3 mb-4'>
      <div className="text-2xl text-center uppercase font-bold">shopping bag</div>
      <p className="text-center mt-2">Never lose styles in your shopping bag again - simply login or register to save them</p>
    </div>

    <button onClick={modalHandler} className='capitalize bg-black text-white px-8 my-4 py-2 outline-none border border-slate-800 rounded-lg block w-full text-center'>
      go to checkout
    </button>

      <ul className='mt-10'>
        <li className='flex my-4'>
          <div className="rounded-full h-5 w-5 flag mr-2"></div>
          <span className='text-sm'>Sending from <b>United State</b></span>
        </li>
        <li className='flex my-4'>
          <IconContext.Provider value={{ className: "h-5 w-5 mr-2" }}>
            <FiInfo/>
          </IconContext.Provider>
          <span className='text-sm'>you may have to pay import duties</span>
        </li>
      </ul>

      <hr/>
      <p>yo!</p>

    <Modal onOpen={popUp} setPopUp={setPopUp}>
      <Tabs>
        <TabList>
          <Tab className='uppercase text-lg'>sign in</Tab>
          <Tab className='uppercase text-lg'>i&apos;m new here</Tab>
        </TabList>

        <TabPanels className='p-0'>
          <TabPanel className="p-0">
            <AuthForm>
              <label className='text-sm capitalize'>email address</label>
              <input type='text' className='w-full rounded-md p-2 border border-slate-300  focus:border-neutral-900  focus:border-2'/>
              <label className='text-sm capitalize'>password</label>
              <input type='password' className='relative w-full rounded-md p-2 border border-slate-300 focus:border-neutral-900  focus:border-2'/>
              <a href="#" className='text-sm underline'>Forgot your password?</a>
              <button className='font-medium capitalize bg-neutral-900 text-white px-8 my-4 py-3 outline-none border border-current rounded-lg block w-full'>
                sign in
              </button>
              <div className='text-center'>
                <a className='underline capitalize'>new to SNEAKFIT? registered.</a>
                <span className='block my-2'>OR</span>
              </div>

              <IconContext.Provider value={{ className: "global-class-name h-5 w-5" }}>
                <button onClick={googleSigningHandler} className='capitalize flex justify-center align-center my-4 py-3 outline-none border border-slate-800 rounded w-full'>
                  <span className='text-md font-medium mr-2 leading-tight'>Continue with google</span>
                  <FcGoogle/>
                </button> 
              </IconContext.Provider>
            </AuthForm>
          </TabPanel>
          <TabPanel>
            <AuthForm>
              <label className='text-sm capitalize'>email address</label>
              <input type='text' className='w-full rounded-md p-2 border border-slate-300  focus:border-neutral-900  focus:border-2'/>
              <label className='text-sm capitalize'>password</label>
              <input type='password' className='w-full rounded-md p-2 border border-slate-300 focus:border-neutral-900 focus:border-2'/>
              <label className='text-sm capitalize'>confirm password</label>
              <input type='password' className='w-full rounded-md p-2 border border-slate-300 focus:border-neutral-900  focus:border-2'/>
              <button className='font-medium capitalize bg-neutral-900 text-white px-8 my-4 py-3 outline-none border border-current rounded-lg block w-full'>
                sign in
              </button>

              <IconContext.Provider value={{ className: "global-class-name h-5 w-5" }}>
                <button className='capitalize flex justify-center align-center my-4 py-3 outline-none border border-slate-800 rounded w-full'>
                  <span className='text-md font-medium mr-2 leading-tight'>Continue with google</span>
                  <FcGoogle/>
                </button> 
              </IconContext.Provider>
            </AuthForm>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Modal>
      
    </div>
  )
}

export default Bag