import ActionTypes from '../action/ActionTypes';

let initialState = {
  token: '',
  message: '',
  status: 0,
};

const loginReducers = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_RESPONSE_LOGIN:
      return {
        state,
        status: payload.status,
        token: payload.access_token,
        message: payload.message,
        refresh: true,
      };
    default:
      return state;
  }
};

export default loginReducers;
