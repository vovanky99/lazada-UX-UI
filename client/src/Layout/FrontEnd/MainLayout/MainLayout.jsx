import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '~/api/axios';

import { getUser } from '~/Redux/Actions/Auth';
import routes from '~/config/routes';
import { useEffect } from 'react';

import Footer from '~/layout/FrontEnd/Footer';
import Header from '~/layout/FrontEnd/Header';
import styles from './mainLayout.module.scss';
import Main from '../Main';
import Store from '~/Redux/Store';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  //login action
  const csrf = () => axios.get('/sanctum/csrf-cookie');
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.Auth.isAuthenticated);
  // user logined
  useEffect(() => {
    const logined = () => {
      if (
        localStorage.getItem('token') &&
        (location.pathname === routes.register || location.pathname === routes.signIn)
      ) {
        navigate(-1);
      }
    };
    logined();
  }, [isAuth, localStorage.getItem('token')]);

  /* handle set localstorage auth social */
  useEffect(() => {
    const getCookieValue = (name) => {
      const cookies = document.cookie.split('; ');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    };

    // handle decrypt cookie for auth social
    const decrypt = getCookieValue('authToken');
    const token = localStorage.getItem('token');
    if (decrypt && !token) {
      const getDecryptedCookieValue = async (cookie) => {
        try {
          const res = await axios.get(`/api/decrypt-cookie?cookie=` + cookie);
          localStorage.setItem('token', res.data.decryptedValue.slice(res.data.decryptedValue.indexOf('|') + 1));
        } catch (e) {
          return null;
        }
      };
      getDecryptedCookieValue(decrypt);
    }
    //function to check authsocialCallbackComplete parameter is present in the URL
    const checkAuthSocialCallbackCOmplete = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('authCallbackComplete') === 'true';
    };
    // Close the window or tab if authCallbackComplete parameter is present
    if (checkAuthSocialCallbackCOmplete()) {
      window.close();
    }
  }, [document.cookie]);

  /* handle get user */
  useEffect(() => {
    // set auth token for header
    const setAuthToken = (token) => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    };
    // get user
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token && isAuth === false) {
        setAuthToken(token);
        Store.dispatch(getUser(token));
      }
    };
    fetchData();
  }, [localStorage.getItem('token')]);

  /* loader */
  useEffect(() => {
    const load = () => {
      const loader = document.querySelector('.loader_life-shop');
      setTimeout(() => {
        loader.classList.add('loader_life-shop--hidden');
      }, 2000);
    };
    window.addEventListener('load', load);
    return () => {
      window.removeEventListener('load', load);
    };
  }, []);

  return (
    <>
      <div className={cx('wrapper', 'loader-contain container-fluid')}>
        <div className="loader_life-shop"></div>
        <Header />
        <Main children={children} />
        <Footer />
      </div>
    </>
  );
}
export default MainLayout;
