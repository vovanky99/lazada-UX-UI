import { GET_USER, LOGOUT, LOG_ERROR, REGISTER_ERROR, LOGIN, REGISTER, SOCIAL_AUTH } from '../Actions/Types';

export const initialState = {
  isAuthenticated: false,
  user: null,
  message: null,
};
export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SOCIAL_AUTH:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    case REGISTER:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOG_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}
