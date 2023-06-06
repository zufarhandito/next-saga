import ActionTypes from '../action/ActionTypes';

const initialState = {
  categories: [],
  message: '',
  refresh: '',
};

function productCategoryReducers(state = initialState, action: any) {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
    case ActionTypes.GET_CATEGORIES_RESPONSE:
      return { state, categories: payload, refresh: true };
    default:
      return state;
  }
}

// console.log(productCategoryReducers());

export default productCategoryReducers;
