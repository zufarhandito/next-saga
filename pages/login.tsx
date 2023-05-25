import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "./redux/action/ActionReducer";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const login = () => {
  const router = useRouter();
  const { token, message, status } = useSelector(
    (state: any) => state.loginReducers
  );
  const [isMessage, setIsMessage] = useState(false);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data: any) => {
    dispatch(doLogin(data));
  };

  useEffect(() => {
    message? setIsMessage(true): setIsMessage(false)
    const token = Cookies.get('access_token')
    if (token) {
      router.push("/");
    }
  }, [handleLogin,isMessage]);
  return (
    <div className="md:flex md:fle  x-col lg:flex lg:flex-row h-screen">
      <div className="lg:w-2/3 bg-red-400 h-10">
        <img
          className="object-cover lg:h-screen w-full h-full"
          src="images/login.jpg"
        />
      </div>
      <div className="lg:w-1/3 lg:p-20 p-14 h-screen flex justify-center">
        <div className="h-fit my-auto">
          <div className=" text-center">
            <p className="text-4xl font-black">login.</p>
            <p className="my-2">
              To access our contents, please login by username address and
              password
            </p>
          </div>
          {
            (isMessage && status == 400)?             <p className="bg-red-200 text-red-700 text-sm py-2 px-3 rounded-md relative flex justify-between">
            <div>{message}</div>
            <button onClick={() => setIsMessage(false)}>x</button>
          </p>:
          ''
          }
          <div className="my-8 ">
            <form onSubmit={handleSubmit(handleLogin)}>
              <input
                id="username"
                className="p-3 w-full bg-slate-100 rounded my-2"
                type="username"
                placeholder="username"
                {...register("username")}
              />
              <input
                id="Password"
                className="p-3 w-full bg-slate-100 rounded my-2"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <div className="flex justify-between mt-2 mb-10 text-sm font-normal">
                <div>
                  <input type="checkbox" name="rememberMe" id="rememberMe" />
                  <label className="ml-2" htmlFor="rememberMe">
                    Remember me?
                  </label>
                </div>
                <div>
                  <a href="">Forget password?</a>
                </div>
              </div>
              <button
                type="submit"
                className=" text-white py-2 text-center w-full my-4 shadow-lg rounded hover:cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              >
                Login
              </button>
              <div className="flex w-full justify-center  ">
                <p className="text-sm">
                  Dont have account?{" "}
                  <Link href="/register" className="text-blue-500 font-bold">
                    Register
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
