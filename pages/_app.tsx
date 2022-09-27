import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { ReactElement } from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { ChakraProvider } from '@chakra-ui/react'


function Layout({children }: {children: ReactElement}) {
  return(
    <>
    <Navbar/>
      <main>{children}</main>
    <Footer/>
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return( 
     <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
     </ChakraProvider>
   )
}

export default MyApp
