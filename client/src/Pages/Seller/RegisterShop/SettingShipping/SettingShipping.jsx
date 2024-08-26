import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from '../RegisterShop.module.scss';
import LocalStorageService from '~/services/LocalStorageService';
import { RegisterShop } from '~/api/Seller/Profile';
import Dialog from '~/layout/Component/Dialog';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function SettingShipping({ seller }) {
  const [dialog, setDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState('');
  const [resolvePromise, setResolvePromise] = useState(null);
  const setting = seller?.shop?.shop_shipping_methods;
  const [btnSetting, setBtnSetting] = useImmer(() => {
    if (setting?.length !== 0 && typeof setting !== 'undefined') {
      const object = {};
      setting.map((dt) => {
        object[dt?.shipping_method.name] = dt?.status ? true : false;
      });
      return object;
    } else {
      return {
        express: true,
        fast: true,
        saving: true,
        heavy_things: true,
      };
    }
  });
  const [radioSetting, setRadioSetting] = useImmer(() => {
    if (setting?.length !== 0 && typeof setting !== 'undefined') {
      const object = { cod: {} };
      setting.map((dt) => {
        object[dt?.shipping_method?.name] = dt?.status ? true : false;
        object.cod[dt.shipping_method.name] = dt?.cod ? true : false;
      });
      return object;
    } else {
      return {
        express: true,
        fast: true,
        saving: true,
        heavy_things: true,
        cod: {
          express: true,
          fast: true,
          saving: true,
          heavy_things: true,
        },
      };
    }
  });

  const handleToggleCODDetail = (e) => {
    if (e.currentTarget.classList.contains('toggle')) {
      e.currentTarget.classList.remove('toggle');
    } else {
      e.currentTarget.classList.add('toggle');
    }
  };

  const handleBackShopInfo = (e) => {
    const stepsRegister = document.querySelectorAll('.steps_register');
    const settingContent = document.getElementById('setting_shipping_content');
    const shopInfoContent = document.getElementById('shop_info_content');
    if (stepsRegister && settingContent) {
      for (let i = 0; i < stepsRegister.length; i++) {
        if (stepsRegister[i].getAttribute('id') === 'shop_info') {
          stepsRegister[i].classList.add('active');
          stepsRegister[i].classList.remove('finished');
          stepsRegister[i + 1].classList.remove('active');
          shopInfoContent.classList.add('active');
          settingContent.classList.remove('active');
          LocalStorageService.removeItem('settingShipping');
        }
      }
    }
  };

  const handleNextTaxInfo = (e) => {
    const stepsRegister = document.querySelectorAll('.steps_register');
    const settingContent = document.getElementById('setting_shipping_content');
    const taxInfoContent = document.getElementById('tax_info_content');
    if (radioSetting) {
      RegisterShop(radioSetting, 'setting_shipping')
        .then((result) => {
          if (result.success) {
            for (let i = 0; i < stepsRegister.length; i++) {
              if (stepsRegister[i].getAttribute('id') === 'tax_info') {
                stepsRegister[i].classList.add('active');
                stepsRegister[i - 1].classList.remove('active');
                stepsRegister[i - 1].classList.add('finished');
                settingContent.classList.remove('active');
                taxInfoContent.classList.add('active');
                LocalStorageService.setItem('taxInfo', true);
                LocalStorageService.removeItem('settingShipping');
              }
            }
          } else {
          }
        })
        .catch((e) => console.log(e));
    }
  };

  /* handle for confirm  */
  const setShowConfirmBox = (message) => {
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
      setMessageDialog(message);
      setDialog(true);
    });
  };
  const handleConfirmDialog = (e) => {
    const { type } = e.currentTarget.dataset;
    if (type === 'no') {
      setDialog(false);
      if (resolvePromise) resolvePromise(false);
    } else {
      setDialog(false);
      if (resolvePromise) resolvePromise(true);
    }
  };

  /* handle set cod or setting shipping items */
  useEffect(() => {
    const lifeSwitch = document.querySelectorAll('.lifeshop_switch');

    const handleSwitch = async (e) => {
      const { name, type } = e.currentTarget.dataset;
      const { classList } = e.currentTarget;

      if (type === 'cod') {
        if (classList.contains('lifeshop_switch_open')) {
          setRadioSetting((draft) => {
            draft.cod[name] = false;
          });
          classList.add('lifeshop_switch_close');
          classList.remove('lifeshop_switch_open');
        } else {
          setRadioSetting((draft) => {
            draft.cod[name] = true;
          });
          classList.remove('lifeshop_switch_close');
          classList.add('lifeshop_switch_open');
        }
      } else {
        if (classList.contains('lifeshop_switch_open')) {
          const userConfirm = await setShowConfirmBox('dialog.setting_shipping.close');
          if (userConfirm) {
            setRadioSetting((draft) => {
              draft[name] = false;
              draft.cod[name] = false;
            });
            lifeSwitch.forEach((d) => {
              const codName = d.dataset.name;
              if (codName === name) {
                d.classList.add('lifeshop_switch_close');
                d.classList.remove('lifeshop_switch_open');
              }
            });
          }
        } else {
          const userConfirm = await setShowConfirmBox('dialog.setting_shipping.open');
          if (userConfirm) {
            setRadioSetting((draft) => {
              draft[name] = true;
              draft.cod[name] = true;
            });
            lifeSwitch.forEach((d) => {
              const codName = d.dataset.name;
              if (codName === name) {
                d.classList.remove('lifeshop_switch_close');
                d.classList.add('lifeshop_switch_open');
              }
            });
          }
        }
      }
    };
    if (lifeSwitch) {
      lifeSwitch.forEach((d) => d.addEventListener('click', handleSwitch));
    }
    return () => {
      if (lifeSwitch) {
        lifeSwitch.forEach((d) => d.removeEventListener('click', handleSwitch));
      }
    };
  }, []);

  /* set switch node for first start */
  useEffect(() => {
    const lifeSwitch = document.querySelectorAll('.lifeshop_switch');
    if (lifeSwitch) {
      lifeSwitch.forEach((element) => {
        const { name, type } = element.dataset;
        Object.entries(radioSetting)
          .filter((d) => d[0] !== 'cod')
          .map((dt) => {
            if (name === dt[0] && !dt[1]) {
              element.classList.remove('lifeshop_switch_open');
              element.classList.add('lifeshop_switch_close');
            }
          });
        Object.entries(radioSetting.cod).map((dt) => {
          if (name === dt[0] && !dt[1]) {
            element.classList.remove('lifeshop_switch_open');
            element.classList.add('lifeshop_switch_close');
          }
        });
      });
    }
  }, []);

  /* handle toggle setting shipping items  */
  useEffect(() => {
    const toggleContent = document.querySelectorAll('.setting-title button');
    const handleToggleContent = (e) => {
      const { name } = e.currentTarget.dataset;
      if (e.currentTarget.classList.contains('hide-content')) {
        e.currentTarget.classList.remove('hide-content');
        setBtnSetting((draft) => {
          draft[name] = true;
        });
      } else {
        e.currentTarget.classList.add('hide-content');
        setBtnSetting((draft) => {
          draft[name] = false;
        });
      }
    };
    if (toggleContent) {
      toggleContent.forEach((d) => d.addEventListener('click', handleToggleContent));
    }
    return () => {
      if (toggleContent) {
        toggleContent.forEach((d) => d.removeEventListener('click', handleToggleContent));
      }
    };
  }, []);
  return (
    <form className={cx('setting_shipping_form')} noValidate>
      <div className={cx('setting_shipping_form_wrapper')}>
        <div className={cx('title')}>
          <h4 className="text-capitalize">
            <Translate>setting.setting_shipping</Translate>
          </h4>
          <div>
            <Translate>pages.seller.register_shop.setting_shipping_note</Translate>
          </div>
        </div>
        <div className={cx('setting_shipping_form_content')} noValidate>
          <div className={cx('form_content_header', 'd-flex flex-column')}>
            <div id="express" className={cx('express', 'd-flex flex-column')}>
              <div className={cx('express_header', 'setting-title d-flex flex-row justify-content-between')}>
                <div className={cx('title', 'text-capitalize')}>express</div>
                <Button className={cx('text-capitalize')} type="button" data-name="express" small>
                  {btnSetting.express ? (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      <Translate>collapse</Translate> <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  ) : (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      <Translate>expand</Translate> <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                  )}
                </Button>
              </div>
              <div className={cx('express_content', 'flex-row flex-wrap justify-content-between')}>
                <div className={cx('express_content_left', 'd-flex flex-row  text-capitalize align-items-center')}>
                  Express
                  {radioSetting.express && radioSetting.cod.express ? (
                    <div>
                      [<Translate>cod.enabled</Translate>]
                    </div>
                  ) : !radioSetting.express ? (
                    ''
                  ) : !radioSetting.cod.express ? (
                    <div>
                      [<Translate>cod.disabled</Translate>]
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className={cx('express_content_right', 'setting_shipping_btn d-flex flex-row text-capitalize')}>
                  <Button type="button" className={cx('toggle')} onClick={handleToggleCODDetail}>
                    <FontAwesomeIcon icon={faChevronDown} />
                    <FontAwesomeIcon icon={faChevronUp} />
                  </Button>
                  <div
                    className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                    data-name="express"
                  />
                </div>
                <div className={cx('express_content_hide', 'setting_shipping_item flex-row justify-content-end')}>
                  <div className={cx('express_content_hide_setting', 'd-flex flex-column')}>
                    <div className={cx('express_hide_setting_content', 'd-flex flex-row justify-content-between')}>
                      <div className={cx('express_hide_setting_title')}>Activate COD</div>
                      <div
                        className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                        data-type="cod"
                        data-name="express"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="fast" className={cx('fast', 'd-flex flex-column')}>
              <div className={cx('fast_header', ' setting-title d-flex flex-row justify-content-between')}>
                <div className={cx('title', 'text-capitalize')}>fast</div>
                <Button className={cx('text-capitalize')} type="button" data-name="fast" small>
                  {btnSetting.fast ? (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      <Translate>collapse</Translate> <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  ) : (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      <Translate>expand</Translate> <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                  )}
                </Button>
              </div>
              <div className={cx('fast_content', ' flex-row flex-wrap justify-content-between')}>
                <div className={cx('fast_content_left', 'd-flex flex-row text-capitalize align-items-center')}>
                  fast
                  {radioSetting.fast && radioSetting.cod.fast ? (
                    <div>
                      [<Translate>cod.enabled</Translate>]
                    </div>
                  ) : !radioSetting.express ? (
                    ''
                  ) : !radioSetting.cod.express ? (
                    <div>
                      [<Translate>cod.disabled</Translate>]
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className={cx('fast_content_right', 'setting_shipping_btn d-flex flex-row text-capitalize')}>
                  <Button type="button" className={cx('toggle')} onClick={handleToggleCODDetail}>
                    <FontAwesomeIcon icon={faChevronDown} />
                    <FontAwesomeIcon icon={faChevronUp} />
                  </Button>
                  <div
                    className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                    data-name="fast"
                  />
                </div>
                <div className={cx('fast_content_hide', 'setting_shipping_item flex-row justify-content-end')}>
                  <div className={cx('fast_content_hide_setting', 'd-flex flex-column')}>
                    <div className={cx('fast_hide_setting_content', 'd-flex flex-row justify-content-between')}>
                      <div className={cx('fast_hide_setting_title')}>Activate COD</div>
                      <div
                        className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                        data-type="cod"
                        data-name="fast"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="saving" className={cx('saving', 'd-flex flex-column')}>
              <div className={cx('saving_header', 'setting-title d-flex flex-row justify-content-between')}>
                <div className={cx('title', 'text-capitalize')}>saving</div>
                <Button className={cx('text-capitalize')} type="button" data-name="saving" small>
                  {btnSetting.saving ? (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      <Translate>collapse</Translate> <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  ) : (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      <Translate>expand</Translate> <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                  )}
                </Button>
              </div>
              <div className={cx('saving_content', ' flex-row flex-wrap justify-content-between')}>
                <div className={cx('saving_content_left', 'd-flex  flex-row text-capitalize align-items-center')}>
                  saving{' '}
                  {radioSetting.saving && radioSetting.cod.saving ? (
                    <div>
                      [<Translate>cod.enabled</Translate>]
                    </div>
                  ) : !radioSetting.express ? (
                    ''
                  ) : !radioSetting.cod.express ? (
                    <div>
                      [<Translate>cod.disabled</Translate>]
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className={cx('saving_content_right', 'setting_shipping_btn d-flex flex-row text-capitalize')}>
                  <Button type="button" className={cx('toggle')} onClick={handleToggleCODDetail}>
                    <FontAwesomeIcon icon={faChevronDown} />
                    <FontAwesomeIcon icon={faChevronUp} />
                  </Button>
                  <div
                    className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                    data-name="saving"
                  />
                </div>
                <div className={cx('saving_content_hide', ' setting_shipping_item flex-row justify-content-end')}>
                  <div className={cx('saving_content_hide_setting', 'd-flex flex-column')}>
                    <div className={cx('saving_hide_setting_content', 'd-flex flex-row justify-content-between')}>
                      <div className={cx('saving_hide_setting_title')}>Activate COD</div>
                      <div
                        className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                        data-type="cod"
                        data-name="saving"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="heavy_things" className={cx('heavy_things', 'd-flex flex-column')}>
              <div className={cx('heavy_things_header', 'setting-title d-flex flex-row justify-content-between')}>
                <div className={cx('title', 'text-capitalize')}>heavy things</div>
                <Button className={cx('text-capitalize')} type="button" data-name="heaving_things" small>
                  {btnSetting.heavy_things ? (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      <Translate>collapse</Translate> <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  ) : (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      <Translate>expand</Translate> <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                  )}
                </Button>
              </div>
              <div className={cx('heavy_things_content', 'flex-wrap flex-row justify-content-between')}>
                <div className={cx('heavy_things_content_left', 'd-flex flex-row text-capitalize align-items-center')}>
                  heavy things
                  {radioSetting.heavy_things && radioSetting.cod.heavy_things ? (
                    <div>
                      [<Translate>cod.enabled</Translate>]
                    </div>
                  ) : !radioSetting.express ? (
                    ''
                  ) : !radioSetting.cod.express ? (
                    <div>
                      [<Translate>cod.disabled</Translate>]
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div
                  className={cx('heavy_things_content_right', ' setting_shipping_btn d-flex flex-row text-capitalize')}
                >
                  <Button type="button" className={cx('toggle')} onClick={handleToggleCODDetail}>
                    <FontAwesomeIcon icon={faChevronDown} />
                    <FontAwesomeIcon icon={faChevronUp} />
                  </Button>
                  <div
                    className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                    data-name="heavy_things"
                  />
                </div>
                <div className={cx('heavy_things_content_hide', 'setting_shipping_item flex-row justify-content-end')}>
                  <div className={cx('heavy_things_content_hide_setting', 'd-flex flex-column')}>
                    <div className={cx('heavy_things_hide_setting_content', 'd-flex flex-row justify-content-between')}>
                      <div className={cx('heavy_things_hide_setting_title')}>Activate COD</div>
                      <div
                        className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                        data-type="cod"
                        data-name="heavy_things"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('form_btn', 'd-flex flex-row justify-content-between')}>
        <Button type="button" outline small onClick={handleBackShopInfo}>
          <Translate>back</Translate>
        </Button>
        <Button type="button" primary small onClick={handleNextTaxInfo}>
          <Translate>next</Translate>
        </Button>
      </div>
      <Dialog message={messageDialog} open={dialog} onCancel={handleConfirmDialog} onConfirm={handleConfirmDialog} />
    </form>
  );
}
