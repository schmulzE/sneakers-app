import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Layout from "../components/Layout"
import { ChakraProvider } from '@chakra-ui/react'
import WishlistProvider from "../store/wishlist_provider"
import BagProvider from "../store/bag_provider"
import { Session } from 'next-auth';
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps, }: AppProps<{session: Session}>) {
  return( 
    <ChakraProvider>
      <BagProvider>
        <WishlistProvider>
          <SessionProvider session={pageProps.session}> 
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </WishlistProvider>
      </BagProvider>
     </ChakraProvider>
   )
}

export default MyApp


