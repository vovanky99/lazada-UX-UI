import LocalStorageService from '~/services/LocalStorageService';
import {
  GET_USER,
  LOGOUT,
  LOG_ERROR,
  SOCIAL_AUTH,
  GET_ADMIN,
  LOGOUT_ADMIN,
  GET_SELLER,
  LOGOUT_SELLER,
} from '../Types/index';
import axios from '~/api/axios';

//login action
const csrf = () => axios.get('/sanctum/csrf-cookie');

export const getUser = () => {
  return async (dispatch) => {
    try {
      csrf();
      const res = await axios.get('/api/user');
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

/* set session for auth */
export const setSession = (accessToken, name) => {
  return async (dispatch) => {
    if (!LocalStorageService.getItem(`${name}`)) {
      LocalStorageService.setItem(`${name}`, accessToken);
    }
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      LocalStorageService.removeItem(`${name}`);
      delete axios.defaults.headers.common['Authorization'];
    }
  };
};

export const getAdmin = () => {
  return async (dispatch) => {
    try {
      csrf();
      const res = await axios.get('/api/admin');
      dispatch({
        type: GET_ADMIN,
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getSeller = () => {
  return async (dispatch) => {
    try {
      csrf();
      const res = await axios.get('/api/seller');
      dispatch({
        type: GET_SELLER,
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const AuthSocial = (provider) => {
  return async (dispatch) => {
    try {
      // await csrf();
      window.open(
        `http://localhost:8000/api/auth/${provider}`,
        '_blank',
        'width=600,height=400,resizable=yes,scrollbars=yes',
      );
      dispatch({
        type: SOCIAL_AUTH,
      });
    } catch (e) {
      dispatch({
        type: LOG_ERROR,
        payload: `login with${provider} happen issue`,
      });
    }
  };
};

export const Logout = () => {
  return async (dispatch) => {
    try {
      await axios.post('/api/logout');
      dispatch({
        type: LOGOUT,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const AdminLogout = () => {
  return async (dispatch) => {
    try {
      await axios.post('/api/logout');
      dispatch({
        type: LOGOUT_ADMIN,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const SellerLogout = () => {
  return async (dispatch) => {
    try {
      await axios.post('/api/logout');
      dispatch({
        type: LOGOUT_SELLER,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
