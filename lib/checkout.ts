import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)


export const checkout = async (bag) => {
 try {

  // const lineItems = items.map(p => ({price: p.properties?.rankingTrackingId, quantity: p.quantity}))

  const { data } = await axios.post('/api/stripe/sessions', {
    bag
  })
  const session = await data.session
  const stripe = await stripePromise
  const { error} = await stripe.redirectToCheckout({ sessionId: session.id })
  if (error) {
  if(error instanceof Error) throw new Error(error.message)
  }else {
    throw error
  }
 } catch (error) {
  console.log(error)
 }
}

