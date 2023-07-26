import React, { useEffect, useState, Fragment } from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useForm } from 'react-hook-form';
import { Combobox, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  doAddProduct,
  doRequestGetCategory,
} from '../redux/action/ActionReducer';
import Image from 'next/image';
import EditorComp from '../components/editor';
import NavigationContent from '../components/navigation';
import { HiCheck, HiChevronDown, HiPencil, HiX } from 'react-icons/hi';
import { HiCloudArrowUp } from 'react-icons/hi2'
import { convertFromRaw } from 'draft-js';
import HargaInput from '../components/hargaInput';

interface ImageItem {
  dataURL: string;
  file: File;
}

const AddProduct = () => {
  const { categories } = useSelector(
    (state: any) => state.productCategoryReducers
  );

  const [selected, setSelected] = useState<any>();
  const [desc, setDesc] = useState<any>()
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const maxNumber = 5;

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  }: any = useForm();

  const registerOptions = {
    name: { required: 'Name is required' },
    // category_id: { required: 'Category is required' },
    price: { required: 'Price is required' },
    // image: { required: 'Image is required' },
    // description: { required: 'Description is required' },
    weightkg: { required: 'Weight is required' },
  };

  const handleRegistration = async (data: any) => {
    console.log('anu', images)

    const formData: any = new FormData();
    formData.append('name', data.name);
    formData.append('image', images);
    formData.append('cobafile', data.cobafile[0]);
    // formData.append('category_id', selected.id);
    // formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('weightkg', data.weightkg);

    // console.log('anjay')
    console.log(...formData, 'anu')
    // dispatch(doAddProduct(formData));
    // router.push("/products");
  };

  useEffect(() => {
    dispatch(doRequestGetCategory());
  }, [dispatch, desc, errors]);

  useEffect(() => {
    setSelected(categories[0])
  }, [categories])

  const handleError = () => { };

  const onChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex, 'imagelist');
    setImages(imageList as never[]);
  };

  const tableHeads = [
    'No',
    'Image',
    'Description',
    'Action',
  ]

  // console.log(errors, 'errors')

  return (
    <div className="bg-white min-h-screen border border-gray-200 p-8">
      <NavigationContent />
      <ImageUploading
        multiple
        value={images}
        onChange={onChangeImage}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }: any) => (
          <form
            onSubmit={handleSubmit(handleRegistration, handleError)}
          >
            {/* // write your building UI */}
            <div className='flex flex-col lg:flex-row gap-10'>
              <div className="lg:w-1/2">
                {/* <br /> */}
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
                <input type="file" {...register('cobafile')} />
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
                          <HiChevronDown
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
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                    ? 'bg-teal-600 text-white'
                                    : 'text-gray-900'
                                  }`
                                }
                                value={cat}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      {cat.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                          }`}
                                      >
                                        <HiCheck
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
                <div className='flex gap-4'>
                  <label className="block mt-4 w-full">
                    <span className="block text-sm font-medium text-slate-700">
                      Harga
                    </span>
                    <HargaInput register={register} />
                    <p className="text-red-500">
                      {errors?.price && errors?.price.message}
                    </p>
                  </label>
                  <label className="block mt-4 w-full">
                    <span className="block text-sm font-medium text-slate-700">
                      Berat
                    </span>
                    <input
                      type="number"
                      id="berat"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      {...register('weightkg', registerOptions.weightkg)}
                    />
                    <p className="text-red-500">
                      {errors?.weightkg && errors?.weightkg.message}
                    </p>
                  </label>
                </div>
                <br />
                <div className="upload__image-wrapper flex flex-col">
                  <div>
                    <button
                      className='border-dashed border-2 flex flex-col items-center justify-center pb-8 rounded-md border-gray-300 w-full h-52 text-xs'
                      type='button'
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <HiCloudArrowUp className='w-12 h-12 text-gray-200' />
                      <p className='text-gray-700'>Drag and drop your product images here.</p>
                      <p className='text-gray-400'>-or-</p>
                      <p className='text-purple-600'>Select images from your computer</p>
                    </button>
                  </div>
                  <br />
                </div>
                {/* {
                  errors && <div>
                    {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
                    {errors.acceptType && <span>Your selected file type is not allow</span>}
                    {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                    {errors.resolution && <span>Selected file is not match your desired resolution</span>}
                  </div>
                } */}
              </div>
              <div className='lg:w-1/2'>
                <label className="block">
                  <span className="block mb-1 text-sm font-medium text-slate-700">
                    Description
                  </span>
                  {/* <textarea
                className="mt-1 p-2 block border h-80 w-full border-slate-300 rounded-md text-sm shadow-sm"
                {...register('description', registerOptions.description)}
              ></textarea>
              <p className="text-red-500">
                {errors?.description && errors?.description.message}
              </p> */}
                  <EditorComp setDesc={setDesc} />
                  {/* <p className='text-red-500'>
                    {errors?.description && errors?.description.message}
                  </p> */}
                </label>
              </div>
            </div>
            {/* {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="200" />
                <div className="image-item__btn-wrapper">
                  <button type='button' onClick={() => onImageUpdate(index)}>Update</button>
                  <button type='button' onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))} */}
            <div>
              <div className='flex items-center gap-5 mb-2'>
                <span className="block font-medium text-slate-700">
                  Images
                </span>
                <button onClick={onImageRemoveAll} type='button' className='py-1 text-red-600 border border-red-200 px-3 rounded-full'>Remove All</button>
              </div>
              <p className='text-sm text-gray-500 my-5'>*Gambar maksimal 5</p>
              <table className="w-full text-left">
                <thead className="py-7">
                  <tr className="bg-purple-200">
                    {tableHeads.map((row, index) => (
                      <th className="py-3 px-3" key={index}>{row}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {imageList.map((image: ImageItem, index: number) => (
                    <tr key={index} className="bg-white">
                      <td className="py-3 px-2">{index + 1}</td>
                      <td className="py-3 px-2">
                        <Image alt='image' src={image.dataURL} width={100} height={100} />
                      </td>
                      <td className="py-3 px-2">Description</td>
                      <td className="py-3 px-2 w-16">
                        <div className="flex gap-2 text-lg">
                          <button type='button' onClick={() => onImageUpdate(index)} className='bg-green-100 text-green-600 p-2 rounded-lg'> <HiPencil /> </button>
                          <button type='button' onClick={() => onImageRemove(index)} className='bg-red-100 text-red-600 p-2 rounded-lg'> <HiX /> </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="submit"
              className="mt-4 order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1"
            >
              Submit
            </button>
          </form>
        )}
      </ImageUploading>
    </div>
  );
};

export default AddProduct;
