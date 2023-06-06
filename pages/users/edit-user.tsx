import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { doUpdate } from '../redux/action/ActionReducer';

const EditUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data: any) => {
    data.id = user.id;
    dispatch(doUpdate(data));
    // console.log(data);
    router.push('/users');
  };

  const handleError = (errors: any) => {};

  const registerOptions = {
    username: { required: 'Username is required' },
    firstname: { required: 'Firstname is required' },
    lastname: { required: 'Lastname is required' },
    password: {
      required: false,
      validate: (val: string) => {
        if (val && val.length < 8) {
          return 'Password setidaknya 8 characters';
        }
      },
    },
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userById')));

    let defaultValue: any = {};
    defaultValue.username = user.username;
    defaultValue.firstname = user.firstname;
    defaultValue.lastname = user.lastname;
    reset({ ...defaultValue });
  }, []);
  console.log(user);
  return (
    <div className="m-32 bg-white p-10 rounded-md">
      {/* <ToastContainer /> */}
      <form onSubmit={handleSubmit(handleRegistration, handleError)}>
        <div className="flex flex-col">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Username
            </span>
            <input
              defaultValue={user.username}
              id="username"
              className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="text"
              //   name="username"
              {...register('username', registerOptions.username)}
            />
            <p className="text-red-500">
              {errors?.username && errors.username.message}
            </p>
          </label>
        </div>
        <div>
          <label className="block mt-4">
            <span className="block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              placeholder="Kosongkan bila tidak ingin diganti"
              className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="text"
              //   name="password"
              {...register('password', registerOptions.password)}
            />
            <p className="text-red-500">
              {errors?.password && errors.password.message}
            </p>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-7">
          <div>
            <label className="block  mt-5">
              <span className="block text-sm font-medium text-slate-700">
                Firstname
              </span>
              <input
                defaultValue={user.firstname}
                type="text"
                className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                // name="firstname"
                {...register('firstname', registerOptions.firstname)}
              />
              <p className="text-red-500">
                {/* {errors?.firstname && errors.firstname.message} */}
              </p>
            </label>
          </div>
          <div>
            <label className="block mt-5">
              <span className="block text-sm font-medium text-slate-700">
                Lastname
              </span>
              <input
                defaultValue={user.lastname}
                type="text"
                className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                // name="lastname"
                {...register('lastname', registerOptions.lastname)}
              />
              <p className="text-red-500">
                {/* {errors?.lastname && errors.lastname.message} */}
              </p>
            </label>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
