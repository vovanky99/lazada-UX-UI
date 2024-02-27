import classNames from 'classnames/bind';
import style from './Address.module.scss';
import Account from '../Account';

const cx = classNames.bind(style);

function Address() {
  return (
    <>
      <Account>
        <h1>Address</h1>
      </Account>
    </>
  );
}

export default Address;
