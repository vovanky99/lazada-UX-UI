import { GET_USER, LOGOUT, LOG_ERROR, REGISTER_ERROR } from '../Types/index';
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
    } catch (e) {
      dispatch({
        type: LOG_ERROR,
      });
    }
  };
};

export const Logout = () => {
  return async (dispatch) => {
    csrf();
    let token = localStorage.getItem('token');
    if (token) {
      await axios.post('api/logout', { params: { token } });
      localStorage.removeItem('token');
      dispatch({ type: LOGOUT });
      window.location.reload();
    }
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
