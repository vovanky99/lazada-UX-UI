import {
  GET_ADMIN,
  GET_USER,
  LOGOUT,
  LOG_ERROR,
  LOGOUT_ADMIN,
  GET_SELLER,
  LOGOUT_SELLER,
  CHANGE_LANGUAGE,
  GET_COUNTRY,
  SIGNATURE_CLOUDINARY,
} from '../Actions/Types';

export const initialState = {
  isAuthenticated: false,
  user: null,
  adminAuthenticated: false,
  sellerAuthenticated: false,
  signatureCloudinary: null,
  seller: null,
  admin: null,
  country: null,
  language: 'en',
};
export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case GET_SELLER:
      return {
        ...state,
        seller: action.payload,
        sellerAuthenticated: true,
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
    case LOGOUT_SELLER:
      return {
        ...state,
        seller: null,
        sellerAuthenticated: false,
      };
    case LOG_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case SIGNATURE_CLOUDINARY:
      return {
        ...state,
        signatureCloudinary: action.payload,
      };
    default:
      return state;
  }
}
