import axios from '../config/endpoint';

const findAll = () => {
  return axios.get('/users');
};
const create = (data:any) => {
  return axios.post('/users/sp', data);
};
const getById = (id:any) => {
  return axios.get(`/users/${id}`);
};

const updateUserCustomer = (data:any) => {
  return axios.patch(`/users/${data.id}`, data);
};

const remove = (id:any) => {
  return axios.delete(`/users/${id}`);
};

const findAllProduct = () => {
  return axios.get('/products');
};

const createProduct = (data:any) => {
  return axios.post('/products', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

const updateProduct = (data:any, id:any) => {
  return axios.patch(`/products/${id}`, data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

const deleteProduct = (id:any) => {
  return axios.delete(`/products/${id}`);
};

const getProductCat = () => {
  return axios.get('/product-categories');
};

export default {
  findAll,
  create,
  getById,
  updateUserCustomer,
  remove,
  findAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCat,
};
