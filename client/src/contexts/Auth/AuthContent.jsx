import { createContext, useContext, useEffect, useState } from 'react';
import axios from '~/api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState('');

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);
  const getUser = async () => {
    try {
      const { data } = await axios.get('/api/user');
      setUser(data);
    } catch (errors) {
      // if (errors.response.status == 401) {
      //   console.log('user empty');
      // } else {
      //   console.log(errors);
      // }
    }
  };
  const logout = async ({}) => {
    await csrf();
    try {
      const result = await axios.post('api/logout');
      if (result) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (e) {}
  };
  const login = async ({ ...data }) => {
    await csrf();
    try {
      const result = await axios.post('/api/login', data);
      if (result && result.data) {
        localStorage.setItem('token', result.data.authorization.token);
        getUser();
      }
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };
  const register = async ({ ...data }) => {
    await csrf();
    try {
      axios.post('/api/register', data);
      getUser();
      navigate('/');
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, errors, getUser, login, register, logout }}>{children}</AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
