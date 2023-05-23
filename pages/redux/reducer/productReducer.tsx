
import ActionTypes from '../action/ActionTypes';

const initialState = {
  products: [],
  message: '',
  refresh: '',
};

const record:any = []

// payload.payload
function productReducers(state = initialState, action:any) {

  const { type, payload } = action;
  // console.log(payload);

  switch (type) {
    case ActionTypes.GET_PRODUCTS_RESPONSE:
      record.push(payload)
      return { state, products: payload, refresh: true };
    case ActionTypes.ADD_PRODUCT_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.UPDATE_PRODUCT_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.DEL_PRODUCT_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.GET_PRODUCT_ID_RESPONSE:
      return { state };
    default:
      return state;
  }
}

export default productReducers;
