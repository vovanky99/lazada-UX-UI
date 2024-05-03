import { GET_ADMIN, GET_USER, LOGOUT, LOG_ERROR, REGISTER_ERROR, LOGOUT_ADMIN } from '../Actions/Types';

export const initialState = {
  isAuthenticated: false,
  user: null,
  adminAuthenticated: false,
  admin: null,
  message: null,
};
export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case GET_ADMIN:
      return {
        ...state,
        admin: action.payload,
        adminAuthenticated: true,
      };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    case LOGOUT_ADMIN:
      return {
        ...state,
        admin: null,
        adminAuthenticated: false,
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
