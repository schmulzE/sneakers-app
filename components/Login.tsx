import React from 'react'
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from 'formik';
import {loginValidate} from '../lib/validate';
import { signIn } from "next-auth/react"
import { useRouter } from "next/router";



const Login = () => {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit,
  })

  async function onSubmit(values: any) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "http://localhost:3000/checkout"
    })

    if(status?.ok)router.push(status.url!)
  }

  const googleSigningHandler = async() => {
    signIn('google', { callbackUrl: 'http://localhost:3000/checkout'})
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label className='text-sm capitalize'>email address</label>
        <input type='email' name='email' className='w-full rounded-md p-2 border border-slate-300  focus:border-neutral-900 focus:border-2' {...formik.getFieldProps('email')}/>
        {formik.errors.email && formik.touched.email ? <span className='text-rose-500 text-xs'> <>{formik.errors.email}</> </span> : <></>}
        <label className='text-sm capitalize'>password</label>
        <input type='password' name='password' className='relative w-full rounded-md p-2 border border-slate-300 focus:border-neutral-900  focus:border-2'  {...formik.getFieldProps('password')}/>
        {formik.errors.password && formik.touched.password ? <span className='text-rose-500 text-xs block'><>{formik.errors.password}</></span> : <></>}

        <a href="#" className='text-sm underline'>Forgot your password?</a>
        <button type="submit" className='font-medium capitalize bg-neutral-900 text-white px-8 my-4 py-3 outline-none border border-current rounded-lg block w-full'>
          sign in
        </button>
        <div className='text-center'>
          <a className='underline capitalize'>new to SNEAKFIT? registered.</a>
          <span className='block my-2'>OR</span>
        </div>

        <IconContext.Provider value={{ className: "global-class-name h-5 w-5" }}>
          <button onClick={googleSigningHandler} className='capitalize flex justify-center align-center my-4 py-3 outline-none border border-slate-800 rounded w-full'>
            <span className='text-md font-medium mr-2 leading-tight'>Continue with google</span>
            <FcGoogle/>
          </button> 
        </IconContext.Provider>
      </form>
    </>
  )
}

export default Login