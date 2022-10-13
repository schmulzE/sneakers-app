import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Layout from "../components/Layout"
import { ChakraProvider } from '@chakra-ui/react'
import WishlistProvider from "../store/wishlist_provider";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <ChakraProvider>
      <WishlistProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WishlistProvider>
     </ChakraProvider>
   )
}

export default MyApp
