import classNames from 'classnames/bind';
import style from './Order.module.scss';
import Account from '../Account';

const cx = classNames.bind(style);

function Order() {
  return (
    <>
      <Account>
        <h1>Order</h1>
      </Account>
    </>
  );
}

export default Order;
