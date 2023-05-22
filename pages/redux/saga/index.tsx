import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../action/ActionTypes';
import {
  handleGetAllUser,
  handleAddUser,
  handleDelUser,
  handleUpdateUser,
  handleGetAllProduct,
  handleDelProduct,
  handleGetAllCategories
} from './userSaga';

function* watchAll() {
  yield all([
    takeEvery(ActionTypes.REQ_GET_USERS, handleGetAllUser),
    takeEvery(ActionTypes.ADD_USER, handleAddUser),
    takeEvery(ActionTypes.UPDATE_USER, handleUpdateUser),
    takeEvery(ActionTypes.DEL_USER, handleDelUser),

    takeEvery(ActionTypes.REQ_GET_PRODUCT,handleGetAllProduct),
    takeEvery(ActionTypes.DEL_PRODUCT,handleDelProduct),

    takeEvery(ActionTypes.REQ_GET_CATEGORIES,handleGetAllCategories)
  ]);
}

export default watchAll;
