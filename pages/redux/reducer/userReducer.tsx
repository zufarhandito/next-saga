import ActionTypes from '../action/ActionTypes';

const initialState = {
  user: [],
  message: '',
  status: 0,
  refresh: '',
};

function userReducers(state = initialState, action:any) {
  const { type, payload } = action;
  // console.log(action);

  switch (type) {
    case ActionTypes.GET_USERS_RESPONSE:
      return {
        state,
        user: payload.data,
        status: payload.status,
        // message: payload.message,
        refresh: true,
      };
    case ActionTypes.UPDATE_USER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.DEL_USER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.ADD_USER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default userReducers;
