import classNames from 'classnames/bind';

import styles from './OtherInfo.module.scss';
import Translate from '~/layout/Component/Translate';
import RadioList from '~/layout/Component/RadioList';
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import ArrowDownIcon from '~/layout/Component/Icon/ArrowDownIcon';

const cx = classNames.bind(styles);

export default function OtherInfo({ cat }) {
  const statusRef = useRef();
  const preOrder = [
    { title: Translate({ children: 'no' }), type: 0 },
    { title: Translate({ children: 'yes' }), type: 1 },
  ];
  const [status, setStatus] = useState('new');
  const [otherProduct, setOtherProduct] = useImmer({
    status: 1,
    sku_product: '',
    pre_order: 0,
  });

  const handlePreOrderClick = (e) => {
    setOtherProduct((draft) => {
      draft.pre_order = parseInt(e.currentTarget.dataset.type);
    });
  };

  const handleTonggleStatus = (e) => {
    const { parentNode } = e.currentTarget;
    parentNode.classList.toggle('toggle');
  };

  /**
   * click outside status toggle
   */
  useEffect(() => {
    const status = statusRef.current;
    const toggle = document.querySelector('.status-toggle');
    const handleClickOutsideStatus = (e) => {
      if (!status.contains(e.target) && e.target !== toggle) {
        status.classList.remove('toggle');
      }
    };
    if (status && toggle) {
      document.addEventListener('click', handleClickOutsideStatus);
    }
    return () => {
      if (status && toggle) {
        document.removeEventListener('click', handleClickOutsideStatus);
      }
    };
  }, [cat]);

  useEffect(() => {
    const items = document.querySelectorAll('.status-item');
    const status = statusRef.current;
    const toggle = document.querySelector('.status-toggle');
    const handleClickStatus = (e) => {
      const { id, value } = e.currentTarget.dataset;
      setStatus(value);
      setOtherProduct((draft) => {
        draft.status = parseInt(id);
      });
      status.classList.remove('toggle');
    };
    if (items) {
      items.forEach((d) => d.addEventListener('click', handleClickStatus));
    }
    return () => {
      if (items) {
        items.forEach((d) => d.removeEventListener('click', handleClickStatus));
      }
    };
  }, [cat]);
  return (
    <div className={cx('other_info', 'd-flex flex-column')}>
      <h4 className={cx('title', cat && 'text-black')}>
        <Translate>pages.seller.add_product.other_info</Translate>
      </h4>
      {cat ? (
        <div className={cx('content', 'd-flex flex-column')}>
          <div className={cx('pre_order', 'd-flex flex-row')}>
            <label>
              <Translate>pages.seller.add_product.pre_order</Translate>
            </label>
            <div className={cx('pre_order_content', 'd-flex flex-column ')}>
              <div className={cx('radio_list', 'd-flex flex-row')}>
                <RadioList
                  color="primary"
                  data={preOrder}
                  className="text-capitalize"
                  titleClass="pre_order"
                  onClick={handlePreOrderClick}
                />
              </div>
              <span className={cx('radio_note')}>
                <Translate>pages.seller.add_product.pre_order_note</Translate>
              </span>
            </div>
          </div>
          <div id="status" className={cx('status', 'd-flex flex-row')}>
            <label>
              <Translate>pages.seller.add_product.status</Translate>
            </label>
            <div ref={statusRef} className={cx('status_content')}>
              <div
                className={cx(
                  'show',
                  'status-title form-control d-flex flex-row justify-content-between align-items-center',
                )}
                onClick={handleTonggleStatus}
              >
                <p>
                  <Translate>{status}</Translate>
                </p>
                <ArrowDownIcon />
              </div>
              <div className={cx('status_toggle', 'status-toggle flex-column')}>
                <div className={cx('new', 'status-item')} data-id={1} data-value="new">
                  <Translate>new</Translate>
                </div>
                <div className={cx('used', 'status-item')} data-value="used">
                  <Translate>used</Translate>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('sku_product', 'd-flex flex-row')}>
            <label>
              <Translate>sku_product</Translate>
            </label>
            <input
              name="sku_product"
              value={otherProduct.sku_product}
              className={cx('sku_content', 'form-control')}
              onChange={(e) => {
                setOtherProduct((draft) => {
                  draft.sku_product = e.target.value;
                });
              }}
            />
          </div>
        </div>
      ) : (
        <div className={cx('none_content')}>
          <Translate>pages.seller.add_product.have_not_select_cat</Translate>
        </div>
      )}
    </div>
  );
}
