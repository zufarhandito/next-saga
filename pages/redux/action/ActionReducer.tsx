import ActionTypes from './ActionTypes';

export const doRequestGetUser = () => {
  return {
    type: ActionTypes.REQ_GET_USERS,
  };
};

export const doGetUserResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_USERS_RESPONSE,
    payload,
  };
};

export const doAdd = (payload: any) => {
  return {
    type: ActionTypes.ADD_USER,
    payload,
  };
};

export const doAddResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_USER_RESPONSE,
    payload,
  };
};

export const doUpdate = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload,
  };
};

export const doUpdateResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_USER_RESPONSE,
    payload,
  };
};

export const doDelete = (payload: any) => {
  return {
    type: ActionTypes.DEL_USER,
    payload,
  };
};

export const doDeleteResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_USER_RESPONSE,
    payload,
  };
};

export const doRequestGetProduct = () => {
  return {
    type: ActionTypes.REQ_GET_PRODUCT,
  };
};

export const doGetProductResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_PRODUCTS_RESPONSE,
    payload,
  };
};

export const doDeleteProduct = (payload: any) => {
  return {
    type: ActionTypes.DEL_PRODUCT,
    payload,
  };
};

//get product by id
export const doGetProductById = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_PRODUCT_ID,
    payload,
  };
};

export const doGetDelProductResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_PRODUCT_RESPONSE,
    payload,
  };
};

export const doRequestGetCategory = () => {
  return {
    type: ActionTypes.REQ_GET_CATEGORIES,
  };
};

export const doGetCategoriesResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_CATEGORIES_RESPONSE,
    payload,
  };
};

export const doAddProduct = (payload: any) => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    payload,
  };
};

export const doAddProductResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_PRODUCT_RESPONSE,
    payload,
  };
};

export const doUpdateProduct = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT,
    payload,
  };
};

export const doUpdateProductResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT_RESPONSE,
    payload,
  };
};

export const doProductByIdResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_PRODUCT_ID_RESPONSE,
    payload,
  };
};

export const doLogin = (payload: any) => {
  return {
    type: ActionTypes.REQ_LOGIN,
    payload,
  };
};

export const doGetResponseLogin = (payload: any) => {
  return {
    type: ActionTypes.GET_RESPONSE_LOGIN,
    payload,
  };
};

export const doRequestGetUserPage = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_USER_PAGE,
    payload,
  };
};

export const doGetUserPageResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_USER_PAGE_RESPONSE,
    payload,
  };
};
