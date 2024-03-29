import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import styles from './Cart.module.scss';
import Checkbox from '~/Layout/FrontEnd/Checkbox';
import JustForYou from '../Home/JustForYou';
import { faL, faLocationDot, faMinus, faPlus, faShop } from '@fortawesome/free-solid-svg-icons';
import Images from '~/components/Images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Cart() {
  const [deleteAll, setDeleteAll] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalProduct, setTotalProduct] = useState(1000);
  const [voucher, setVoucher] = useState('');
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handlePlus = () => {
    if (quantity > totalProduct) {
      setQuantity(totalProduct);
    }
    if (quantity < totalProduct) {
      setQuantity(quantity + 1);
    }
  };
  const handleVoucher = () => {};

  useEffect(() => {
    const checkbox_all = document.getElementById('checkbox-all');
    const check_shop = document.querySelectorAll('.checkbox-shop');
    const check_products = document.querySelectorAll('.checkbox-products');
    const handleChecked = (e) => {
      for (let i = 0; i < check_shop.length; i++) {
        if (check_shop[i] != checkbox_all) {
          check_shop[i].checked = e.target.checked;
          for (let j = 0; j < check_products.length; j++) {
            if (check_products[j] != check_shop[i]) {
              check_products[j].checked = check_shop[i].checked;
            }
          }
        }
      }
    };

    if (checkbox_all) {
      checkbox_all.addEventListener('click', handleChecked);
    }
    return () => {
      if (checkbox_all) {
        checkbox_all.addEventListener('click', handleChecked);
      }
    };
  }, []);

  const handleCheckedShop = (val) => {
    // const check_products = document.querySelectorAll(`.products-` + val + ` .checkbox-products`);
    // const check_shop = document.querySelectorAll(`.products-` + val + ` .checkbox-shop`);
    console.log(val);
    // for (let j = 0; j < check_products.length; j++) {
    //   if (check_products[j] != check_shop) {
    //     check_products[j].checked = check_shop.checked;
    //   }
    // }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content', 'd-flex flex-row')}>
        <div className={cx('cart-left', 'd-flex flex-column')}>
          <div className={cx('list-header', 'd-flex flex-row justify-content-between align-items-center')}>
            <div className={cx('check-all')}>
              <Checkbox
                checkedAll="checkbox-all"
                IconCheck={cx('icon-check')}
                ClassName={cx('checkbox', 'checkbox-all')}
                Label="SELECT ALL (1 ITEM(S))"
              />
            </div>
            <div className={cx('delete-products')}>
              <FontAwesomeIcon icon={faTrashCan} />
              DELETE
            </div>
          </div>
          <div className={cx('checkout-shop-outer', 'products-1')}>
            <div className={cx('shop-header', 'd-flex flex-row')}>
              <Checkbox
                // onClick={handleCheckedShop(1)}
                checkboxclass="checkbox-shop"
                IconCheck={cx('icon-check')}
                ClassName={cx('checkbox')}
              />
              <div className={cx('shop-name')}>
                <FontAwesomeIcon icon={faShop} />
                Tung Dinh Dinh
              </div>
            </div>
            <div className={cx('shop-products', 'd-flex flex-row justify-content-between align-items-center')}>
              <div className={cx('shop-products-left', 'd-flex flex-row align-items-center')}>
                <Checkbox checkboxclass="checkbox-products" IconCheck={cx('icon-check')} ClassName={cx('checkbox')} />
                <Link to={`/products`} className={cx('shop-content', 'd-flex flex-row ')}>
                  <div className={cx('img')}>
                    <Images
                      src="https://lzd-img-global.slatic.net/g/p/ccb928791621c4c1318f0c80abf8790f.png_2200x2200q80.png_.webp"
                      alt="https://lzd-img-global.slatic.net/g/p/ccb928791621c4c1318f0c80abf8790f.png_2200x2200q80.png_.webp"
                    />
                  </div>
                  <span className={cx('title')}>
                    Áo sơ mi kaki nam trơn basic dài tay cao cấp đi học đi làm ROMAN SM02
                  </span>
                </Link>
              </div>
              <div className={cx('shop-products-midle', 'd-flex flex-column align-items-center')}>
                <div className={cx('price')}>51000</div>
                <div className={cx('delete')}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
              <div className={cx('shop-products-right', 'd-flex flex-row justify-content-end')}>
                <button onClick={handleMinus}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                    setQuantity(value);
                  }}
                  onKeyUp={(e) => {
                    if (e.target.value > totalProduct) {
                      setQuantity(totalProduct);
                    }
                    if (e.target.value < 1) {
                      setQuantity(1);
                    }
                  }}
                />
                <button onClick={handlePlus}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
          <div className={cx('checkout-shop-outer', 'products-2')}>
            <div className={cx('shop-header', 'd-flex flex-row')}>
              <Checkbox
                // onClick={handleCheckedShop(2)}
                checkboxclass="checkbox-shop"
                IconCheck={cx('icon-check')}
                ClassName={cx('checkbox')}
              />
              <div className={cx('shop-name')}>
                <FontAwesomeIcon icon={faShop} />
                Tung Dinh Dinh
              </div>
            </div>
            <div className={cx('shop-products', 'd-flex flex-row justify-content-between align-items-center')}>
              <div className={cx('shop-products-left', 'd-flex flex-row align-items-center')}>
                <Checkbox checkboxclass="checkbox-products" IconCheck={cx('icon-check')} ClassName={cx('checkbox')} />
                <Link to={`/products`} className={cx('shop-content', 'd-flex flex-row ')}>
                  <div className={cx('img')}>
                    <Images
                      src="https://lzd-img-global.slatic.net/g/p/ccb928791621c4c1318f0c80abf8790f.png_2200x2200q80.png_.webp"
                      alt="https://lzd-img-global.slatic.net/g/p/ccb928791621c4c1318f0c80abf8790f.png_2200x2200q80.png_.webp"
                    />
                  </div>
                  <span className={cx('title')}>
                    Áo sơ mi kaki nam trơn basic dài tay cao cấp đi học đi làm ROMAN SM02
                  </span>
                </Link>
              </div>
              <div className={cx('shop-products-midle', 'd-flex flex-column align-items-center')}>
                <div className={cx('price')}>51000</div>
                <div className={cx('delete')}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
              <div className={cx('shop-products-right', 'd-flex flex-row justify-content-end')}>
                <button onClick={handleMinus}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                    setQuantity(value);
                  }}
                  onKeyUp={(e) => {
                    if (e.target.value > totalProduct) {
                      setQuantity(totalProduct);
                    }
                    if (e.target.value < 1) {
                      setQuantity(1);
                    }
                  }}
                />
                <button onClick={handlePlus}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('cart-right')}>
          <div className={cx('location', 'd-flex flex-column')}>
            <div className={cx('title', 'text-capitalize')}>Location</div>
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
              Phường Phú Hội, Thành Phố Huế,Thừa Thiên Huế
            </div>
          </div>
          <div className={cx('order-summary')}>
            <div className={cx('title')}>Order Summary</div>
            <div className={cx('subtotal', 'd-flex flex-row justify-content-between')}>
              <div className={cx('title', 'text-capitalize')}>subtotal (0 items )</div>
              <div className={cx('price')}>0</div>
            </div>
            <div className={cx('shipping-fee', 'd-flex flex-row justify-content-between')}>
              <div className={cx('title', 'text-capitalize')}>Shipping Fee</div>
              <div className={cx('price')}>0</div>
            </div>
            <div className={cx('voucher', 'd-flex flex-row justify-content-center')}>
              <input name="voucher" value={voucher} placeholder="Enter Voucher Code" />
              <button onClick={handleVoucher}>APPLY</button>
            </div>
            <div className={cx('total', 'd-flex flex-row justify-content-between')}>
              <div className={cx('title', 'text-capitalize')}>total</div>
              <div className={cx('price')}>0</div>
            </div>
          </div>
          <button className={cx('btn-comfirn', 'btn text-uppercase')}>confirm cart(0)</button>
        </div>
      </div>
      <JustForYou />
    </div>
  );
}
