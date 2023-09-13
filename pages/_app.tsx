import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Layout from "../components/Layout"
import { ChakraProvider } from '@chakra-ui/react'
import CartProvider from '../context/CartContext'
import BagProvider from '../context/BagContext'
import { Session } from 'next-auth';
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps, }: AppProps<{session: Session}>) {
  return( 
    <ChakraProvider>
      <BagProvider>
          <CartProvider>
            <SessionProvider session={pageProps.session}> 
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionProvider>
          </CartProvider>
      </BagProvider>
     </ChakraProvider>
   )
}

export default MyApp


