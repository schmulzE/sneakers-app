import Link from 'next/link'
import React from 'react'
import { BsBagXFill } from "react-icons/bs";

const Custom404 = () => {
  return (
  <div className='bg-white'>
    <div className='max-w-3xl mx-auto px-4 py-32 sm:px-6 sm:py-24 lg:px-8'>
      <div className='max-w-xl my-18 md:my-24 lg:my-24 flex flex-col justify-center content-center items-center text-center'>
        <BsBagXFill className='text-6xl lg:text-9xl'/>
        <h1 className='text-2xl my-4'>
          Page not found
        </h1>
        <p className='mt-2 text-base'>
          The page you're looking for cannot be found.
        </p>
        <div className="mt-8">
          <Link href={'/'}>
            <a  className='text-lg bg-gray-950 text-white text-center p-2 mt-4 rounded-lg'>
              Go to homepage
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Custom404
