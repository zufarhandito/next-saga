import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Router, { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { doUpdateProduct } from '../redux/action/ActionReducer';

const EditProduct = () => {
  const [productById, setProductById] = useState<any>('');
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setProductById(JSON.parse(localStorage.getItem('productById')));

    let defaultValue: any = {};
    defaultValue.name = productById.name;
    defaultValue.price = productById.price;
    defaultValue.category_id = productById.category_id;
    defaultValue.description = productById.description;
    reset({ ...defaultValue });
  }, []);

  const registerOptions = {
    name: { required: 'Name is required' },
    category_id: { required: 'Category is required' },
    price: { required: 'Price is required' },
    image: { required: 'Image is required' },
    description: { required: 'Description is required' },
  };

  const handleRegistration = async (data: any) => {
    const formData = new FormData();
    formData.append('id', productById.id);
    formData.append('name', data.name);
    formData.append('image', data.image[0]);
    formData.append('category_id', data.category_id);
    formData.append('description', data.description);
    formData.append('price', data.price);
    // console.log();
    // console.log(formData.get('name'));
    // console.log(data);
    // const idProduct = filteredProduct.id;
    dispatch(doUpdateProduct(formData));
    router.push('/products');
  };

  const handleError = () => { };

  return (
    <div className="bg-white py-14 rounded-md px-5">
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
          <p className="text-red-500">
            {errors?.image && errors.image.message}
          </p>
        </div>

        <div className="w-1/2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Nama Produk
            </span>
            <input
              defaultValue={productById.name}
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
            <input
              defaultValue={productById.category_id}
              id="category_id"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-slate-200 rounded-md text-sm  placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              type="number"
              {...register('category_id', registerOptions.category_id)}
            />
            <p className="text-red-500">
              {errors?.category_id && errors.category_id.message}
            </p>
          </label>
          <label className="block mt-4">
            <span className="block text-sm font-medium text-slate-700">
              Harga
            </span>
            <input
              defaultValue={productById.price}
              type="number"
              id="price"
              className="mt-1 block w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
              defaultValue={productById.description}
              className="mt-1 block border h-auto w-full border-slate-300 rounded-md text-sm shadow-sm"
              {...register('description')}
            ></textarea>
            <p className="text-red-500">
              {errors?.description && errors.description.message}
            </p>
          </label>
          <div className="mt-4 flex justify-between gap-3">
            <button
              type="submit"
              className="inline-flex w-1/2 justify-center rounded-md border border-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-100 hover:border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex w-1/2 justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
