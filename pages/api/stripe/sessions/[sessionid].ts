import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
})

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET') {
    try {
      const { sessionId } = req.body
      if(!sessionId.startsWith('cs_')) {
        throw new Error('Incorrect Checkout Session ID')
      }
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'line_items.data.proce.product'],
      })

      return res.status(201).json(checkoutSession)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal server error'
      return res.status(error.statusCode || 500).json({ message: errorMessage })
    }
  }

  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Bot Allowed');
  return
}

export default handler