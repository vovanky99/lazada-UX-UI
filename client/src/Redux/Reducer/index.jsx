import { useNavigate } from 'react-router-dom';

import { GET_USER, LOGOUT, LOG_ERROR, REGISTER_ERROR } from '../Actions/Types';
import axios from '~/api/axios';

export const initialState = {
  isAuthenticated: false,
  user: null,
  log_error: '',
};
export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      state.user = null;
      state.isAuthenticated = false;
      return state;
    case LOG_ERROR:
      state.user = action.payload;
      state.isAuthenticated = true;
      state.log_error = 'email or password incorrect!';
      return state;
    case REGISTER_ERROR:
      state.log_error = 'have issue happen when register!';
      return state;
    default:
      return state;
  }
}
