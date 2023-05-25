import Cookies from 'js-cookie';
import axios from '../config/endpoint';

axios.interceptors.request.use((config:any) => {
try {
  const token = Cookies.get('access_token')
  config.headers['Authorization'] = token;
  return config;
} catch (error:any) {
  console.log(error.message)
}
});

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

const updateProduct = (data:any) => {
  const id = data.get('id')
  console.log(id);
  return axios.patch(`/products/${id}`, data);
};

const deleteProduct = (id:any) => {
  return axios.delete(`/products/${id}`);
};

const getProductCat = () => {
  return axios.get('/product-categories');
};

const login = (data:any) => {
  return axios.post('/login',data)
}

const userPage = (offset: any) => {
  return axios.post('/users/page',offset)
}

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
  login,
  userPage
};
