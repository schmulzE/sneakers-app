import React, { useState,useContext  } from 'react';
import { GetServerSideProps } from "next";
import {getSession, useSession } from "next-auth/react";
import BagContext from "../../store/bag_context";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

  
  export default function Component() {
    // const { data: session } = useSession()
  
  
    const bagCtx = useContext(BagContext)
   
  
    let delivery = 19
    const subTotal: number = bagCtx.items?.reduce((acc: number, curr: any) =>  {return  acc + curr.priceInfo?.finalPrice}, 0)
    const total = bagCtx.items?.reduce((acc: number, curr: any) =>  {return  acc + curr.priceInfo?.finalPrice}, delivery)
  
  // if (session) {
    return (
      <div className="md:mt-32 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 lg:gap-12">
        <div className="px-4 mt-4 order-2">
          <PayPalScriptProvider options={{ "client-id": "AUsZf2bnH7iX4v-zINOqLqrGUvjy2DNVPr7gk5RV1u09F0DcqxfTQKu8pAQ4WPJ--pfj7YLXccripGp7" }}>
              <PayPalButtons
              style={{ color: "white" }} 
              createOrder={(data, actions) => {
                return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        value: total,
                      },
                    },
                  ],
                })
                .then((orderId) => {
                  // Your code here after create the order
                  return orderId;
                });
              }}/>
          </PayPalScriptProvider>
        </div>
        <div id="table-section" className='px-4 content-center'>
          <h2 className='font-bold lg:w-1/2 lg:mx-auto'>Summary</h2>
          <table className="w-full text-md text-left table-fixed text-gray-500 lg:w-1/2 lg:mx-auto md:w-full md:mx-auto">
            <tbody>
              <tr className="bg-white">
                <th scope="row" className="pb-1 pt-3 font-medium text-gray-900 whitespace-nowrap">
                  Subtotal
                </th>
                <td className="py-1 text-right">
                  {subTotal}
                </td>
              </tr>
              <tr className="bg-white pb-4">
                <th scope="row" className="pt-1 pb-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Delivery
                </th>
                <td className="pt-1 pb-3 text-right">
                  $19
                </td>           
              </tr>
              <tr className="bg-white border-t">
                <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap">
                  Total
                </th> 
                <td className="py-4 text-right">
                  USD{total}
                </td>          
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  
  if(!session){
    return {
      redirect: {
        destination:'/checkout/bag',
        permanent: false
      }
    }
  }

  return {
    props: {session}
  }
}