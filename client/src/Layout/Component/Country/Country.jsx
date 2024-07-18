import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetCountry } from '~/redux/Actions/General';
import Store from '~/redux/Store';

export function getCountry() {
  Store.dispatch(GetCountry());
}

export default function Country({ children }) {
  const { country } = useSelector((state) => state.Auth);
  useEffect(() => {
    getCountry();
  }, []);
  return <Fragment>{country ? <Fragment>{children}</Fragment> : ''}</Fragment>;
}
