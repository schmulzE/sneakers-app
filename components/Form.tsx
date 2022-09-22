import React from 'react'

const Form = () => {
  return (
    <div className='px-2 py-9'>
      <h1 className='text-3xl uppercase font-black text-center tracking-wide'>sign up and get 15% off</h1>
      <p className="text-sm px-4 text-center">Sign up for promotions, tailored new arrivals, stock update and more - straight to your inbox</p>
      <div className='text-center py-6'>
        <input className="mr-2" type="checkbox"/>
        <span className='text-sm mr-3'>Women sneakers</span>
        <input className="mr-2" type="checkbox"/>
        <span className='text-sm'>Men sneakers</span>
      </div>
      <div className="mb-2 block">
        <input className="mr-2" type="checkbox"/>
        <label
          htmlFor="email"
        >Get Email</label>
      </div>
      <input
        className='w-full rounded-md p-3 border border-slate-300'
        id="email"
        type="email"
        placeholder="Your email address"
        required={true}
      />
      <div className="mb-2 mt-6 block">
        <input className="mr-2" type="checkbox"/>
        <label
          htmlFor="sms"
        >SMS</label>
      </div>
      <input
        className='w-full rounded-md p-3 border border-slate-300'
        id="sms"
        type="number"
        placeholder="Your phone number"
        required={true}
      />
       <button className='font-bold capitalize bg-neutral-900 text-white px-8 my-4 py-2 outline-none border border-current rounded block w-full'>
        sign up
      </button>
    </div>
  )
}

export default Form