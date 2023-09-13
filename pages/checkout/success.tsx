import { useEffect} from 'react'
import { useRouter } from 'next/router'
import  useSWR  from 'swr'

import { useBag } from '../../context/BagContext'

const fetcher  = (...args: [RequestInfo | URL]) => fetch(...args).then(res => res.json())
const success = () => {
  const { resetBag } = useBag()

  useEffect(() => {
    resetBag()
  }, [resetBag])

  const { query: sessionId } = useRouter()

  const URL = sessionId ? `api/stripe/sessionId/${sessionId}` : null
  const {data: checkoutSession, error} = useSWR(URL, fetcher)
  if (error) return <div>failed to load the session</div>

  const customer = checkoutSession?.customer_details
  const product = checkoutSession?.line_items?.data?.map((item) => ({
    ...item.price.product,
    price: item.price.unit_amount,
    quantity: item.quantity, 
  }))

  const payment = checkoutSession?.payment_intent?.charges.data[0]?.payment
  const subtotal = checkoutSession?.amount_subtotal
  const total = checkoutSession?.amount_total
  const discount = checkoutSession?.total_details?.amount_discount
  const tax = checkoutSession?.total_details?.amount_tax
  
  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-sm font-medium text-indigo-600">Payment succesful</h1>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-600">
            Thanks for ordering
          </p>
          <p className="mt-2 text-base text-gray-500">
            we appreciate your order, we're currently processing it
          </p>
        </div>
      </div>
    </div>
  )
}

export default success
