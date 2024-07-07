import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { getSeller, setSession } from '~/redux/Actions/Auth';
import { GetCountry } from '~/redux/Actions/General';
import Store from '~/redux/Store';
import LocalStorageService from '~/services/LocalStorageService/index';

export default function Seller({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller, sellerAuthenticated } = useSelector((state) => state.Auth);

  /* handle get seller */
  useEffect(() => {
    Store.dispatch(GetCountry());
    const token = LocalStorageService.getItem('sellerToken');
    if (token) {
      Store.dispatch(setSession(token, 'sellerToken'));
      dispatch(getSeller());
    } else {
      navigate(config.ShopSeller.SignIn);
    }
  }, []);
  useEffect(() => {
    if (seller) {
      if (!seller?.email_verified_at) {
        navigate(config.ShopSeller.VerifiedEmail);
      } else if (!seller?.shop_id || !seller?.shop?.status === 0) {
        navigate(config.ShopSeller.RegisterShop);
      }
    }
  }, [seller]);

  return <Fragment>{sellerAuthenticated && <Fragment>{children}</Fragment>}</Fragment>;
}
