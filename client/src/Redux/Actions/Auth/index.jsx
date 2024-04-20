import { GET_USER, LOGOUT, LOG_ERROR, REGISTER_ERROR, LOGIN, SOCIAL_AUTH } from '../Types/index';
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

export const Login = (...data) => {
  return async (dispatch) => {
    try {
      // csrf();
      const result = await axios.post('/api/login', ...data);
      if (result && result.data) {
        localStorage.setItem('token', result.data.authorization.token);
      }
      dispatch({
        type: LOGIN,
      });
    } catch (e) {
      dispatch({
        type: LOG_ERROR,
      });
    }
  };
};

export const AuthSocial = (provider) => {
  return async (dispatch) => {
    try {
      await csrf();
      // const result = await axios.get(`/api/auth/${provider}`, { withCredentials: true });
      // window.open(`http://localhost:8000/api/auth/${provider}`, '_self');
      window.location.href = `http://localhost:8000/api/auth/${provider}`;
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

export const SignUp = (...data) => {
  return async (dispatch) => {
    try {
      csrf();
      const result = await axios.post('/api/register', ...data);
      if (result && result.data) {
        localStorage.setItem('token', result.data.authorization.token);
      }
    } catch (e) {
      dispatch({
        type: REGISTER_ERROR,
      });
    }
  };
};
