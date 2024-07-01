import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { getSeller, setSession } from '~/redux/Actions/Auth';
import Store from '~/redux/Store';
import LocalStorageService from '~/services/LocalStorageService/index';

export default function Seller({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const seller = useSelector((state) => state.Auth.seller);

  /* handle get seller */
  useEffect(() => {
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
      } else if (!seller?.shop_id) {
        navigate(config.ShopSeller.RegisterShop);
      }
    }
  }, [seller]);

  return <Fragment>{children}</Fragment>;
}
