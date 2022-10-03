import React, { ReactElement } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useSWR from 'swr'

function Layout({children }: {children: ReactElement}) {
  // const {data} = useSWR('men-sneakers', fetcher)
  // console.log(data)
  return(
    <>
    <Navbar/>
      <main>{children}</main>
    <Footer/>
    </>
  )
}
export default Layout