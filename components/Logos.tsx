import React from 'react'
import {SiReebok, SiNike, SiAdidas, SiJordan, SiPuma } from 'react-icons/si'

import Image from 'next/image';


import styles from "../styles/Logos.module.css"

const Logos = () => {
  return (
    <div className={styles.marquee}>
      <ul className={styles.marquee__content}>
        <li className='text-5xl'>
          <SiAdidas/>
        </li>
        <li className='text-4xl'>
          <SiNike/>
        </li>
        <li className='text-4xl'>
          <SiJordan/>
        </li>
        <li className='text-4xl'>
          <SiPuma/>
        </li>
        <li className='text-6xl'>
          <SiReebok/>
        </li>

        <li className='text-5xl'>
          <SiAdidas/>
        </li>
        <li className='text-4xl'>
          <SiNike/>
        </li>
        <li className='text-4xl'>
          <SiJordan/>
        </li>
         <li className='text-4xl'>
          <SiPuma/>
        </li>

      </ul>
    </div>

  )
}

export default Logos