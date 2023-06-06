import ActionTypes from '../action/ActionTypes';

const initialState = {
  user: [],
  message: '',
  status: 0,
  refresh: '',
  jumlah: '',
};

function userReducers(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_USERS_RESPONSE:
      return {
        state,
        user: payload.data,
        status: payload.status,
        refresh: true,
      };
    case ActionTypes.UPDATE_USER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.DEL_USER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.ADD_USER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.GET_USER_PAGE_RESPONSE:
      return {
        state,
        user: payload.data,
        totalData: payload.totalData,
        status: payload.status,
        refresh: true,
      };
    default:
      return state;
  }
}

export default userReducers;
