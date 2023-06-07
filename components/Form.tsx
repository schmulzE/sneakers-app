import React from 'react'

const Form = () => {
  return (
    <form className='px-2 py-9 md:w-1/2 lg:w-1/2 xl:w-1/3 md:mx-auto'>
      <h1 className='text-3xl uppercase font-black text-center tracking-wide'>sign up and get 15% off</h1>
      <p className="text-sm px-4 text-center">Sign up for promotions, tailored new arrivals, stock update and more - straight to your inbox</p>
      <div className='text-center py-6'>
        <input className="mr-2" type="radio" id='Womensneakers' value='Womensneakers' name='sneakers'/>
        <label className='text-sm mr-3' htmlFor='Womensneakers'>Women sneakers</label>
        <input className="mr-2" type="radio" id='Mensneakers' value='Mensneakers' name='sneakers'/>
        <label className='text-sm' htmlFor='Mensneakers'>Men sneakers</label>
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
    </form>
  )
}

export default Form