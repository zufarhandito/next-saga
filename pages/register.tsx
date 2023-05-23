import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { doAdd } from './redux/action/ActionReducer';

const register = () => {
  const {message} = useSelector((state:any)=>state.userReducers)
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  interface data {
    username: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string
  }
  const handleRegister=(data:data)=>{
      dispatch(doAdd(data))
  }
  return (
    <div className="md:flex md:flex-col lg:flex lg:flex-row h-screen">
      <div className="lg:w-2/3 bg-red-400 h-10">
        <img
          className="object-cover lg:h-screen w-full h-full"
          src="images/login.jpg"
          alt=""
        />
      </div>
      <div className="lg:w-1/3 px-14 pt-5 flex justify-center">
        <div className="my-auto">
          <div className=" text-center">
            <p className="text-4xl font-black">Register.</p>
            <p className="my-2 text-sm">
              Hello! Please register yourself by email address and password
            </p>
          </div>
          {message}
          <div className="my-8 ">
            <form onSubmit={handleSubmit(handleRegister)}>
              <input
                id="username"
                className="p-3 w-full bg-slate-100 rounded my-2"
                type="text"
                placeholder="username"
                {...register('username',{required:true})}
              />
                          <p className="text-red-500">
              {errors?.username && errors.username.message}
            </p>
              <input
                id="Password"
                className="p-3 w-full bg-slate-100 rounded my-2"
                type="password"
                placeholder="Password"
                {...register('password',{required:true})}
              />
                          <p className="text-red-500">
              {errors?.password && errors.password.message}
            </p>
              <input
                id="confPassword"
                className="p-3 w-full bg-slate-100 rounded my-2 invalid:bg-red-500"
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword',{
                  required: true,
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return "Password tidak sama!";
                    }
                  },
                 })}
              />
            <p className="text-red-500">
              {errors?.confirmPassword && errors.confirmPassword.message}
            </p>
              <div className='flex gap-4'>
              <input
                id="firstname"
                className="p-3 w-1/2 bg-slate-100 rounded my-2"
                type="text"
                placeholder="First Name"
                {...register('firstname',{required:true})}
                />
                            <p className="text-red-500">
              {errors?.firstname && errors.firstname.message}
            </p>
              <input
                id="lastname"
                className="p-3 w-1/2 bg-slate-100 rounded my-2"
                type="text"
                placeholder="Last Name"
                {...register('lastname',{required:true})}
              />
                <p className="text-red-500">
              {errors?.firstname && errors.firstname.message}
            </p>
              </div>
              <div className="flex justify-between mt-2 mb-10 text-sm font-normal">
                <div>
                  <input type="checkbox" name="rememberMe" id="rememberMe" />
                  <label className="ml-2" htmlFor="rememberMe">
                    Remember me?
                  </label>
                </div>
              </div>
              <input
                type="submit"
                value="Create account"
                className=" text-white py-2 text-center w-full my-4 shadow-lg rounded hover:cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              />
              <div className="flex w-full justify-center  ">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 font-bold">
                    Login
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default register