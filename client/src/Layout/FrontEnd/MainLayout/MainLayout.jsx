import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '~/api/axios';

import { getUser } from '~/Redux/Actions/Auth';
import routes from '~/config/routes';
import config from '~/config';
import { useEffect } from 'react';
import Store from '~/Redux/Store';
import Footer from '~/Layout/FrontEnd/Footer';
import Header from '~/Layout/FrontEnd/Header';
import styles from './mainLayout.module.scss';
import Main from '../Main';

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
        (location.pathname == routes.register || location.pathname == routes.signIn)
      ) {
        navigate('/');
      }
    };
    logined();
  }, [isAuth, location.pathname, localStorage.getItem('token')]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          csrf();
          // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          const res = await axios.get('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { token },
          });
          Store.dispatch(getUser(res.data));
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [isAuth, localStorage.getItem('token')]);
  return (
    <>
      <div className={cx('wrapper', 'container-fluid')}>
        <Header />
        <Main children={children} />
        <Footer />
      </div>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
