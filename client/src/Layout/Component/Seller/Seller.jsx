import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { getSeller, setSession } from '~/redux/Actions/Auth';
import Store from '~/redux/Store';

export default function Seller({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const seller = useSelector((state) => state.Auth.seller);
  /* handle get seller */
  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (token) {
      Store.dispatch(setSession(token, 'sellerToken'));
      dispatch(getSeller());
    }
  }, []);

  const checkEmailVerified = () => {
    if (!seller) {
      navigate(config.ShopSeller.SignIn);
    } else if (!seller?.email_verified_at) {
    }
  };
  checkEmailVerified();
  return <Fragment>{children}</Fragment>;
}
