import { GET_USER, LOGOUT, LOG_ERROR, REGISTER_ERROR, SOCIAL_AUTH } from '../Types/index';
import axios from '~/api/axios';

//login action
const csrf = () => axios.get('/sanctum/csrf-cookie');

export const getUser = (data) => {
  return (dispatch) => {
    if (data) {
      dispatch({
        type: GET_USER,
        payload: data,
      });
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
    dispatch({
      type: LOGOUT,
    });
  };
};
