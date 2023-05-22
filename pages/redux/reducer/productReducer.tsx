import ActionTypes from '../action/ActionTypes';

const initialState = {
  products: [],
  message: '',
  refresh: '',
};

function productReducers(state = initialState, action:any) {
  const { type, payload } = action;
  // console.log(payload);

  switch (type) {
    case ActionTypes.GET_PRODUCTS_RESPONSE:
      return { state, products: payload, refresh: true };
    // case ActionTypes.ADD_PRODUCT:
    //   return { state, message: payload.message, refresh: false };
    // case ActionTypes.UPDATE_PRODUCT:
    //   return { state, message: payload.message, refresh: false };
    case ActionTypes.DEL_PRODUCT_RESPONSE:
      return { state, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default productReducers;
