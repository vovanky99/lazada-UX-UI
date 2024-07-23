import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Store from '~/redux/Store';
import LocalStorageService from '~/services/LocalStorageService';
import config from '~/config';
import { getAdmin, setSession } from '~/redux/Actions/Auth';
import Country from '../Country';
import { GenerateSignatureCloudinary } from '~/api/General/HandleData';
import { GetSignatureCloudinary } from '~/redux/Actions/General';

export default function Admin({ children }) {
  const navigate = useNavigate();
  const isAdminAuth = useSelector((state) => state.Auth.adminAuthenticated);
  /* get admin  */
  useEffect(() => {
    const token = LocalStorageService.getItem('adminToken');
    if (token) {
      Store.dispatch(setSession(token, 'adminToken'));
      Store.dispatch(getAdmin());
    } else {
      navigate(`${config.adminRoutes.SignIn}`);
    }
  }, []);
  return <Country>{isAdminAuth ? <Fragment>{children}</Fragment> : ''}</Country>;
}
