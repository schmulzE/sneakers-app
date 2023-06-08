import React from 'react'
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from 'formik';
import { registerValidate} from '../lib/validate';
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";


const Register = () => {
  const router = useRouter()


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: ""
    },
    validate: registerValidate,
    onSubmit,
  })

  async function onSubmit(values: any) {
    // console.log(values)
    const options = {
      method: "POST",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    }

    await fetch('https://localhost:3000/api/auth/register', options)
    .then(res => res.json())
    .then((data) => {
       if(data)router.push("http://localhost:3000/checkout")
    })
  }

  const googleSigningHandler = async() => {
    signIn('google', { callbackUrl: 'http://localhost:3000/checkout'})
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label className='text-sm capitalize'>email address</label>
        <input type='email' className='w-full rounded-md p-2 border border-slate-300  focus:border-neutral-900  focus:border-2'  {...formik.getFieldProps('email')}/>
          {formik.errors.email && formik.touched.email ? <span className='text-rose-500 text-xs'><>{formik.errors.email}</></span> : <></>}
        <label className='text-sm capitalize'>password</label>
        <input type='password' className='w-full rounded-md p-2 border border-slate-300 focus:border-neutral-900 focus:border-2'  {...formik.getFieldProps('password')}/>
          {formik.errors.password && formik.touched.password ? <span className='text-rose-500 text-xs'><>{formik.errors.password}</></span> : <></>}
        <label className='text-sm capitalize'>confirm password</label>
        <input type='password' className='w-full rounded-md p-2 border border-slate-300 focus:border-neutral-900  focus:border-2'  {...formik.getFieldProps('cpassword')}/>
          {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500 text-xs'><>{formik.errors.cpassword}</></span> : <></>}
        <button type="submit" className='font-medium capitalize bg-neutral-900 text-white px-8 my-4 py-3 outline-none border border-current rounded-lg block w-full'>
          sign in
        </button>

        <IconContext.Provider value={{ className: "global-class-name h-5 w-5" }}>
          <button className='capitalize flex justify-center align-center my-4 py-3 outline-none border border-slate-800 rounded w-full'>
            <span className='text-md font-medium mr-2 leading-tight'>Continue with google</span>
            <FcGoogle/>
          </button> 
        </IconContext.Provider>
      </form>
    </>
  )
}

export default Register