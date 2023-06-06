import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/apiMethod';
import Cookies from 'js-cookie';
import {
  doAddProductResponse,
  doAddResponse,
  doDeleteProduct,
  doDeleteResponse,
  doGetCategoriesResponse,
  doGetDelProductResponse,
  doGetProductResponse,
  doGetResponseLogin,
  doGetUserPageResponse,
  doGetUserResponse,
  doProductByIdResponse,
  doRequestGetProduct,
  doUpdateProductResponse,
  doUpdateResponse,
} from '../action/ActionReducer';

function* handleGetAllUser(): any {
  try {
    const result = yield call(apiMethod.findAll);
    yield put(doGetUserResponse(result.data));
  } catch (error) {
    yield put(doGetUserResponse({ message: error, status: 400 }));
  }
}

function* handleAddUser(action: any): any {
  try {
    const result = yield call(apiMethod.create, action.payload);
    yield put(doAddResponse(result.data));
  } catch (error: any) {
    yield put(doAddResponse({ message: error.message, status: 400 }));
  }
}

function* handleUpdateUser(action: any): any {
  try {
    const result = yield call(apiMethod.updateUserCustomer, action.payload);
    yield put(doUpdateResponse(result.data));
  } catch (error: any) {
    yield put(doUpdateResponse({ message: error.message, status: 400 }));
  }
}

function* handleUpdateProduct(action: any): any {
  try {
    const result = yield call(apiMethod.updateProduct, action.payload);
    yield put(doUpdateProductResponse(result.data));
  } catch (error: any) {
    yield put(doUpdateProductResponse({ message: error.message, status: 400 }));
  }
}

function* handleDelUser(action: any): any {
  try {
    const result = yield call(apiMethod.remove, action.payload);
    yield put(doDeleteResponse(result.data));
  } catch (error: any) {
    yield put(doDeleteResponse({ message: error.message, status: 400 }));
  }
}

function* handleGetAllProduct(): any {
  try {
    const result = yield call(apiMethod.findAllProduct);
    // console.log(result);
    yield put(doGetProductResponse(result.data));
  } catch (error: any) {
    yield put(doGetProductResponse({ message: error.message, status: 400 }));
  }
}

function* handleDelProduct(action: any): any {
  try {
    const result = yield call(apiMethod.deleteProduct, action.payload);
    yield put(doGetDelProductResponse(result.data));
  } catch (error: any) {
    yield put(doGetDelProductResponse({ message: error.message, status: 400 }));
  }
}

function* handleGetAllCategories(): any {
  // console.log("akndkajndakjsndkasjdn");
  try {
    const result = yield call(apiMethod.getProductCat);
    yield put(doGetCategoriesResponse(result.data));
  } catch (error: any) {
    yield put(doGetCategoriesResponse({ message: error.message, status: 400 }));
  }
}

function* handleAddProduct(action: any): any {
  try {
    const result = yield call(apiMethod.createProduct, action.payload);
    // console.log(action.payload);
    yield put(doAddProductResponse(result.data));
  } catch (error: any) {
    yield put(doAddProductResponse({ message: error.message, status: 400 }));
  }
}

function* handleGetProductById(action: any): any {
  try {
    yield put(doProductByIdResponse(action));
  } catch (error: any) {
    yield put(doProductByIdResponse({ message: error.message, status: 400 }));
  }
}

function* handleLogin(action: any): any {
  try {
    const res = yield call(apiMethod.login, action.payload);
    if (res.data.access_token) {
      Cookies.set('access_token', res.data.access_token);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          id: res.data.data.id,
          username: res.data.data.username,
          createdAt: res.data.data.createdat,
          updatedAt: res.data.data.updatedat,
          firstname: res.data.data.customer.firstname,
          lastname: res.data.data.customer.lastname,
        })
      );
    }
    yield put(doGetResponseLogin(res.data));
  } catch (error: any) {
    yield put(doGetResponseLogin({ message: error.message }));
  }
}

function* handletGetUserPage(action: any): any {
  try {
    const result = yield call(apiMethod.userPage, action.payload);
    // console.log(action);
    yield put(doGetUserPageResponse(result.data));
  } catch (error: any) {
    yield put(doProductByIdResponse({ message: error.message, status: 400 }));
  }
}

export {
  handleGetAllUser,
  handletGetUserPage,
  handleLogin,
  handleAddUser,
  handleUpdateUser,
  handleDelUser,
  handleGetAllProduct,
  handleDelProduct,
  handleGetAllCategories,
  handleAddProduct,
  handleUpdateProduct,
  handleGetProductById,
};
