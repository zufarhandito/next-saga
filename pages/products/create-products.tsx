import React, { useEffect, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Combobox, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  doAddProduct,
  doRequestGetCategory,
} from '../redux/action/ActionReducer';

const AddProduct = () => {
  const { categories, message, refresh } = useSelector(
    (state: any) => state.productCategoryReducers
  );

  const [selected, setSelected] = useState(categories[0]);
  const [query, setQuery] = useState('');

  const filteredCategories =
    query === ''
      ? categories
      : categories.filter((cat: any) =>
          cat.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const dispatch = useDispatch();
  const router = useRouter();

  // console.log(selected.id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    name: { required: 'Name is required' },
    category_id: { required: 'Category is required' },
    price: { required: 'Price is required' },
    image: { required: 'Image is required' },
    description: { required: 'Description is required' },
  };

  const handleRegistration = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image[0]);
    formData.append('category_id', selected.id);
    formData.append('description', data.description);
    formData.append('price', data.price);

    toast.success('sukses');
    // console.log(...formData)
    // dispatch(doAddProduct(formData));
    // router.push("/products");
  };

  useEffect(() => {
    dispatch(doRequestGetCategory());
    // console.log('a');
  }, []);

  const handleError = () => {};

  return (
    <div className="bg-white min-h-screen rounded-md p-8">
      <form
        className="flex "
        onSubmit={handleSubmit(handleRegistration, handleError)}
      >
        <div className="w-1/2">
          <input
            type="file"
            {...register('image', registerOptions.image)}
            name="image"
            id="image"
          />
          <p className="text-red-500">{errors?.name && errors.name.message}</p>
        </div>

        <div className="w-1/2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Nama Produk
            </span>
            <input
              id="name"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              type="text"
              //   name="name"
              {...register('name', registerOptions.name)}
            />
            <p className="text-red-500">
              {errors?.name && errors.name.message}
            </p>
          </label>
          <label className="block mt-4">
            <span className="block text-sm font-medium text-slate-700">
              Kategori
            </span>
            <Combobox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 "
                    displayValue={(cat: any) => cat.name}
                    onChange={event => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredCategories.length === 0 && query !== '' ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredCategories.map((cat: any) => (
                        <Combobox.Option
                          key={cat.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-teal-600 text-white'
                                : 'text-gray-900'
                            }`
                          }
                          value={cat}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {cat.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </label>
          <label className="block mt-4">
            <span className="block text-sm font-medium text-slate-700">
              Harga
            </span>
            <input
              type="number"
              id="price"
              className="mt-1 block w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              // type="text"
              //   name="price"
              {...register('price', registerOptions.price)}
            />
            <p className="text-red-500">
              {errors?.price && errors.price.message}
            </p>
          </label>
          <label className="block mt-4">
            <span className="block text-sm font-medium text-slate-700">
              Deskripsi
            </span>
            <textarea
              className="mt-1 block border h-auto w-full border-slate-300 rounded-md text-sm shadow-sm"
              {...register('description', registerOptions.description)}
            ></textarea>
            <p className="text-red-500">
              {errors?.description && errors.description.message}
            </p>
          </label>
          <button
            type="submit"
            className="mt-4 order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
