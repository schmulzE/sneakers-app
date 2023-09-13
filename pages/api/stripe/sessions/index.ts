import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
})

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    try {
      const { bag } = req.body
      const route = bag.map(p => ({key: p.id, value: {price: p.priceInfo?.finalPrice * 100, name: p.shortDescription}}))
      const storeItems = new Map(
        route.map(obj => {
          return [obj.key, obj.value];
         }),
         );
      if(!bag.length) {
        return res.status(400).json({ error: 'Bad Request' })
      }
      const session = await stripe.checkout.sessions.create({
        line_items: bag.map(item => {
          const storeItem: any = storeItems.get(item.id)
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: storeItem.name
              },
              unit_amount: storeItem.price,
            },
            quantity: item.quantity
          }
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: req.headers.origin
      })

      return res.status(201).json({ session })
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Bot Allowed');
}

export default handler