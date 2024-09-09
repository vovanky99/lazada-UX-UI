import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Translate from '~/layout/Component/Translate';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodoList } from '~/api/Seller/Home';

const cx = classNames.bind(styles);

export default function Home() {
  const { seller } = useSelector((state) => state.Auth);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    getTodoList()
      .then((result) => {
        setOrder(result);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <section className={cx('seller_wrapper', 'd-flex flex-row ')}>
      <section className={cx('seller_home_left', 'd-flex flex-column')}>
        <section className={cx('home_todolist')}>
          <div className={cx('title', 'd-flex flex-column')}>
            <Translate>pages.seller.home.todo_list</Translate>
            <span>
              <Translate>pages.seller.home.note</Translate>
            </span>
          </div>
          {order && (
            <div className={cx('home_todolist_content', 'd-flex flex-row flex-wrap')}>
              <Button className={cx('todolist-item')} transparent>
                <span>0</span>
              </Button>
            </div>
          )}
        </section>
      </section>
      <section className={cx('seller_home_right')}></section>
    </section>
  );
}
