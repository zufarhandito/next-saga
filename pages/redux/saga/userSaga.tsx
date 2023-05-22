import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/apiMethod';
import {
  doAddResponse,
  doDeleteProduct,
  doDeleteResponse,
  doGetCategoriesResponse,
  doGetProductResponse,
  doGetUserResponse,
  doRequestGetProduct,
  doUpdateResponse,
} from '../action/ActionReducer';

function* handleGetAllUser():any {
  try {
    const result = yield call(apiMethod.findAll);
    yield put(doGetUserResponse(result.data));
  } catch (error) {
    yield put(doGetUserResponse({ message: error, status: 400 }));
  }
}

function* handleAddUser(action:any):any {
  try {
    const result = yield call(apiMethod.create, action.payload);
    yield put(doAddResponse(result.data));
  } catch (error:any) {
    yield put(doAddResponse({ message: error.message, status: 400 }));
  }
}

function* handleUpdateUser(action:any):any {
  try {
    const result = yield call(apiMethod.updateUserCustomer, action.payload);
    yield put(doUpdateResponse(result.data));
  } catch (error:any) {
    yield put(doUpdateResponse({ message: error.message, status: 400 }));
  }
}

function* handleDelUser(action:any):any {
  try {
    const result = yield call(apiMethod.remove, action.payload);
    yield put(doDeleteResponse(result.data));
  } catch (error:any) {
    yield put(doDeleteResponse({ message: error.message, status: 400 }));
  }
}

function* handleGetAllProduct():any{
  try {
    const result = yield call(apiMethod.findAllProduct);
    // console.log(result);
    yield put(doGetProductResponse(result.data));
  } catch (error:any) {
    yield put(doGetProductResponse({ message: error.message, status: 400 }))
  }
}

function* handleDelProduct(action:any):any{
  try {
    const result = yield call(apiMethod.deleteProduct,action.payload);
    yield put(doDeleteProduct(result.data))
  } catch (error:any) {
    yield put(doDeleteProduct({message: error.message, status: 400}))
  }
}

function* handleGetAllCategories():any{
  // console.log("akndkajndakjsndkasjdn");
  try {
    const result = yield call(apiMethod.getProductCat)
    yield put(doGetCategoriesResponse(result.data))
  } catch (error:any) {
    yield put(doGetCategoriesResponse({message: error.message,status:400}))
  }
}

export { handleGetAllUser, handleAddUser, handleUpdateUser, handleDelUser, handleGetAllProduct, handleDelProduct , handleGetAllCategories};
