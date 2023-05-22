import ActionTypes from './ActionTypes';
// import apiMethod from '../../components/api/apiMethod';

export const doRequestGetUser = () => {
  return {
    type: ActionTypes.REQ_GET_USERS,
  };
};

export const doGetUserResponse = (payload:any) => {
  return {
    type: ActionTypes.GET_USERS_RESPONSE,
    payload,
  };
};

export const doAdd = (payload:any) => {
  return {
    type: ActionTypes.ADD_USER,
    payload,
  };
};

export const doAddResponse = (payload:any) => {
  return {
    type: ActionTypes.ADD_USER_RESPONSE,
    payload,
  };
};

export const doUpdate = (payload:any) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload,
  };
};

export const doUpdateResponse = (payload:any) => {
  return {
    type: ActionTypes.UPDATE_USER_RESPONSE,
    payload,
  };
};

export const doDelete = (payload:any) => {
  return {
    type: ActionTypes.DEL_USER,
    payload,
  };
};

export const doDeleteResponse = (payload:any) => {
  return {
    type: ActionTypes.DEL_USER_RESPONSE,
    payload,
  };
};

export const doRequestGetProduct = () =>{
  return{
    type: ActionTypes.REQ_GET_PRODUCT
  }
}

export const doGetProductResponse = (payload:any) => {
  return {
    type: ActionTypes.GET_PRODUCTS_RESPONSE,
    payload,
  };
};

export const doDeleteProduct = (payload:any) => {
  return {
    type: ActionTypes.DEL_PRODUCT,
    payload
  }
}

export const doRequestGetCategory = () => {
  return {
    type: ActionTypes.REQ_GET_CATEGORIES
  }
}

export const doGetCategoriesResponse = (payload:any) => {
  return {
    type: ActionTypes.GET_CATEGORIES_RESPONSE,
    payload
  }
}