import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../action/ActionTypes';
import {
  handleGetAllUser,
  handleAddUser,
  handleDelUser,
  handleUpdateUser,
  handleGetAllProduct,
  handleDelProduct,
  handleLogin,
  handleAddProduct,
  handleGetAllCategories,
  handleUpdateProduct,
  handleGetProductById,
  handletGetUserPage,
} from './userSaga';

function* watchAll() {
  yield all([
    takeEvery(ActionTypes.REQ_GET_USERS, handleGetAllUser),
    takeEvery(ActionTypes.ADD_USER, handleAddUser),
    takeEvery(ActionTypes.UPDATE_USER, handleUpdateUser),
    takeEvery(ActionTypes.DEL_USER, handleDelUser),

    takeEvery(ActionTypes.REQ_GET_PRODUCT, handleGetAllProduct),
    takeEvery(ActionTypes.DEL_PRODUCT, handleDelProduct),
    takeEvery(ActionTypes.ADD_PRODUCT, handleAddProduct),
    takeEvery(ActionTypes.UPDATE_PRODUCT, handleUpdateProduct),

    takeEvery(ActionTypes.REQ_GET_PRODUCT_ID, handleGetProductById),

    takeEvery(ActionTypes.REQ_GET_CATEGORIES, handleGetAllCategories),

    takeEvery(ActionTypes.REQ_LOGIN, handleLogin),

    takeEvery(ActionTypes.REQ_GET_USER_PAGE, handletGetUserPage),
  ]);
}

export default watchAll;
