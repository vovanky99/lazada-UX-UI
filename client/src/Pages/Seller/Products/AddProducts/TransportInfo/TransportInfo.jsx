import classNames from 'classnames/bind';

import styles from './TransportInfo.module.scss';
import Translate from '~/layout/Component/Translate';
import { useEffect, useRef, useState } from 'react';
import Input from '~/components/Input';
import { useImmer } from 'use-immer';
import CloseIcon from '~/layout/Component/Icon/CloseIcon';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import Button from '~/components/Button';
import { Fragment } from 'react';
import PencilIcon from '~/layout/Component/Icon/PencilIcon';
import config from '~/config';
import RadioSwitch from '~/layout/Component/RadioSwitch';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function TransportInfo({ cat }) {
  const value = useSelector((state) => state.auth);
  const weightRef = useRef();
  const wideRef = useRef();
  const heightRef = useRef();
  const longRef = useRef();
  const message = {
    shipping_fee: Translate({ children: 'valid.shipping_fee' }),
    weight: Translate({ children: 'valid.weight' }),
    theBoxEmpty: Translate({ children: "valid.the_box_can't_empty" }),
  };
  console.log(value);
  const [transport, setTransport] = useImmer({
    weight: '',
    height: '',
    long: '',
    wide: '',
  });
  const [shippingFee, setShippingFee] = useImmer({
    fast: '',
    save: '',
    bulkyGoods: '',
    express: '',
  });
  const [validate, setValidate] = useImmer({
    shipping_fee: message.shipping_fee,
    weight: message.weight,
    invalid_size: '',
    boxEmpty: '',
  });
  const handleSetWeight = (value) => {
    setTransport((draft) => {
      draft.weight = value;
    });
  };
  const handleOnChangeWeight = (e) => {
    const { value } = e.target;
    if (value === '') {
      setValidate((state) => {
        state.boxEmpty = message.theBoxEmpty;
        state.weight = message.weight;
      });
      e.target.classList.add('border_danger');
    } else {
      setValidate((state) => {
        state.boxEmpty = '';
        state.weight = '';
      });
      e.target.classList.remove('border_danger');
    }
  };
  useEffect(() => {}, [transport.weight, transport.height, transport.long, transport.wide]);
  return (
    <div className={cx('transport', 'd-flex flex-column')}>
      <h4 className={cx('title', cat && 'text-black')}>
        <Translate>pages.seller.add_product.transport</Translate>
      </h4>
      {cat ? (
        <div className={cx('content', 'd-flex flex-column')}>
          <Input
            ref={weightRef}
            isRow={false}
            validate={validate.boxEmpty}
            validFontSize="1.2rem"
            title="weight"
            name="weight"
            type="number"
            className={cx('weight')}
            // handleSetValue={handleSetWeight}
            onChange={handleOnChangeWeight}
            placeholder="placeholder.weight"
          >
            <div className={cx('symbol')}>
              <span></span>gr
            </div>
          </Input>
          <div className={cx('package_size', 'd-flex flex-row')}>
            <label className={cx('package_title')}>
              <Translate>package_size</Translate>
            </label>
            <div className={cx('package_content', 'd-flex flex-row align-items-center')}>
              <Input
                ref={wideRef}
                title="wide"
                name="wide"
                useTitle={false}
                type="number"
                className={cx('wide')}
                handleSetValue={handleSetWeight}
                placeholder="placeholder.wide"
              >
                <div className={cx('symbol')}>
                  <span></span>cm
                </div>
              </Input>
              <div className={cx('barrier')}>
                <CloseIcon />
              </div>
              <Input
                ref={longRef}
                title="long"
                name="long"
                useTitle={false}
                type="number"
                className={cx('long')}
                handleSetValue={handleSetWeight}
                placeholder="placeholder.long"
              >
                <div className={cx('symbol')}>
                  <span></span>cm
                </div>
              </Input>
              <div className={cx('barrier')}>
                <CloseIcon />
              </div>
              <Input
                ref={heightRef}
                title="height"
                name="height"
                useTitle={false}
                type="number"
                className={cx('height')}
                handleSetValue={handleSetWeight}
                placeholder="placeholder.height"
              >
                <div className={cx('symbol')}>
                  <span></span>cm
                </div>
              </Input>
            </div>
          </div>
          <div className={cx('shipping_fee', 'd-flex flex-row')}>
            <label>
              <Translate>shipping_fee</Translate>
            </label>
            <div className={cx('shipping_fee_content', 'd-flex flex-column')}>
              <MessageDanger classNames={cx('validata_shipping')} message={validate.shipping_fee} />
              <div className={cx('shipping_fee_box', 'd-flex flex-column')}>
                <div className={cx('fast')}>
                  <label>
                    <Translate>fast</Translate>
                  </label>
                  <div className={cx('fast_content', 'd-flex flex-row justify-content-between')}>
                    <div className={cx('content_left', 'd-flex flex-row')}>
                      <span>
                        <Translate>fast</Translate>
                      </span>
                      <span className={cx('shipping_unit')}>
                        <Translate>shipping_unit</Translate>
                      </span>
                    </div>
                    <div className={cx('content_right', 'd-flex flex-row')}>
                      {validate.weight ? (
                        <div className={cx('validated_transport_fee')}>{validate.weight}</div>
                      ) : (
                        <Fragment>
                          <div className={cx('fee')}>{shippingFee.fast}</div>
                          <Button type="button" none_size transparent>
                            <PencilIcon />
                          </Button>
                        </Fragment>
                      )}
                      <div className={cx('btn_switch')}>
                        <RadioSwitch disabled={!transport.weight || validate.invalid_size} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('save')}>
                  <label>
                    <Translate>shipping_fee_save</Translate>
                  </label>
                  <div className={cx('save_content', 'd-flex flex-row justify-content-between')}>
                    <div className={cx('content_left', 'd-flex flex-row')}>
                      <span>
                        <Translate>shipping_fee_save</Translate>
                      </span>
                      <span className={cx('shipping_unit')}>
                        <Translate>shipping_unit</Translate>
                      </span>
                    </div>
                    <div className={cx('content_right', 'd-flex flex-row')}>
                      {validate.weight ? (
                        <div className={cx('validated_transport_fee')}>{validate.weight}</div>
                      ) : (
                        <Fragment>
                          <div className={cx('fee')}>{shippingFee.save}</div>
                          <Button type="button" none_size transparent>
                            <PencilIcon />
                          </Button>
                        </Fragment>
                      )}
                      <div className={cx('btn_switch')}>
                        <RadioSwitch disabled={!transport.weight || validate.invalid_size} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('bulky_gooods')}>
                  <label>
                    <Translate>bulky_goods</Translate>
                  </label>
                  <div className={cx('bulky_gooods_content', 'd-flex flex-row justify-content-between')}>
                    <div className={cx('content_left', 'd-flex flex-row')}>
                      <span>
                        <Translate>bulky_goods</Translate>
                      </span>
                      <span className={cx('shipping_unit')}>
                        <Translate>shipping_unit</Translate>
                      </span>
                    </div>
                    <div className={cx('content_right', 'd-flex flex-row')}>
                      {validate.weight ? (
                        <div className={cx('validated_transport_fee')}>{validate.weight}</div>
                      ) : validate.invalid_size ? (
                        <div>{validate.invalid_size}</div>
                      ) : (
                        <Fragment>
                          <div className={cx('fee')}>{shippingFee.bulkyGoods}</div>
                          <Button type="button" none_size transparent>
                            <PencilIcon />
                          </Button>
                        </Fragment>
                      )}
                      <div className={cx('btn_switch')}>
                        <RadioSwitch disabled={!transport.weight || validate.invalid_size} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('express')}>
                  <label>
                    <Translate>express</Translate>
                  </label>
                  <div className={cx('express_content', 'd-flex flex-row justify-content-between')}>
                    <div className={cx('content_left', 'd-flex flex-row')}>
                      <span>
                        <Translate>express</Translate>
                      </span>
                      <span className={cx('shipping_unit')}>
                        <Translate>shipping_unit</Translate>
                      </span>
                    </div>
                    <div className={cx('content_right', 'd-flex flex-row')}>
                      {validate.weight ? (
                        <div className={cx('validated_transport_fee')}>{validate.weight}</div>
                      ) : (
                        <Fragment>
                          <div className={cx('fee')}>{shippingFee.express}</div>
                          <Button type="button" none_size transparent>
                            <PencilIcon />
                          </Button>
                        </Fragment>
                      )}
                      <div className={cx('btn_switch')}>
                        <RadioSwitch disabled={!transport.weight || validate.invalid_size} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx('shipping_fee_note', 'd-flex flex-column')}>
                <span>
                  <Translate>pages.seller.add_product.note.transport_first</Translate>
                </span>
                <span>
                  <Translate>pages.seller.add_product.note.transport_second</Translate>
                  <Button none_size transparent to={config.shopEdu.articleShippingMethod}>
                    <Translate>click_here</Translate>
                  </Button>
                  <Translate>pages.seller.add_product.note.transport_third</Translate>
                </span>
              </div>
            </div>
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
