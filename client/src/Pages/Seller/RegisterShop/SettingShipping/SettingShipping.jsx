import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect } from 'react';
import { useImmer } from 'use-immer';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from '../RegisterShop.module.scss';
import LocalStorageService from '~/services/LocalStorageService';

const cx = classNames.bind(styles);

export default function SettingShipping() {
  const [btnSetting, setBtnSetting] = useImmer({
    express: true,
    fast: true,
    saving: true,
    heavy_things: true,
  });
  const [radioSetting, setRadioSetting] = useImmer({
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
  });
  // const [codSetting, setCodSetting] = useImmer({});

  const handleToggleCODDetail = (e) => {
    if (e.currentTarget.classList.contains('toggle')) {
      e.currentTarget.classList.remove('toggle');
    } else {
      e.currentTarget.classList.add('toggle');
    }
  };

  const handleBackSettingShipping = (e) => {
    const shopIF = document.getElementById('shop_info');
    const settingShip = document.getElementById('setting_ship');
    const shopInfoContent = document.getElementById('shop_info_content');
    const settingContent = document.getElementById('setting_shipping_content');
    if (shopIF && settingShip && shopInfoContent && settingContent) {
      shopIF.classList.add('active');
      shopIF.classList.remove('finished');
      settingShip.classList.remove('active');
      shopInfoContent.classList.add('active');
      settingContent.classList.remove('active');
      LocalStorageService.removeItem('settingShipping');
    }
  };

  const handleNextSettingShipping = (e) => {
    const settingShip = document.getElementById('setting_ship');
    const settingContent = document.getElementById('setting_shipping_content');
    const taxInfo = document.getElementById('tax_info');
    const taxInfoContent = document.getElementById('tax_info_content');
    if (settingShip && settingContent) {
      LocalStorageService.setItem('taxInfo', true);
      LocalStorageService.setItem('settingShipValue', radioSetting);
      settingShip.classList.remove('active');
      settingShip.classList.add('finished');
      taxInfo.classList.add('active');
      settingContent.classList.remove('active');
      taxInfoContent.classList.add('active');
      LocalStorageService.removeItem('settingShipping');
    }
  };

  /* handle set cod or setting shipping items */
  useEffect(() => {
    const lifeSwitch = document.querySelectorAll('.lifeshop_switch');

    const handleSwitch = (e) => {
      const { name } = e.currentTarget.dataset;
      if (e.currentTarget.classList.contains('lifeshop_switch_open')) {
        e.currentTarget.classList.add('lifeshop_switch_close');
        e.currentTarget.classList.remove('lifeshop_switch_open');
      } else {
        e.currentTarget.classList.remove('lifeshop_switch_close');
        e.currentTarget.classList.add('lifeshop_switch_open');
      }
      if (e.currentTarget.dataset.type === 'cod') {
        if (e.currentTarget.classList.contains('lifeshop_switch_open')) {
          setRadioSetting((draft) => {
            draft.cod[name] = true;
          });
        } else {
          setRadioSetting((draft) => {
            draft.cod[name] = false;
          });
        }
      } else {
        if (e.currentTarget.classList.contains('lifeshop_switch_open')) {
          setRadioSetting((draft) => {
            draft[name] = true;
          });
        } else {
          setRadioSetting((draft) => {
            draft[name] = false;
          });
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
          <h4 className="text-capitalize">shipping method</h4>
          <div>Activate the appropriate shipping method.</div>
        </div>
        <div className={cx('setting_shipping_form_content')} noValidate>
          <div className={cx('form_content_header', 'd-flex flex-column')}>
            <div id="express" className={cx('express', 'd-flex flex-column')}>
              <div className={cx('express_header', 'setting-title d-flex flex-row justify-content-between')}>
                <div className={cx('title', 'text-capitalize')}>express</div>
                <Button className={cx('text-capitalize')} type="button" data-name="express" small>
                  {btnSetting.express ? (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      Collapse <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  ) : (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      expand <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                  )}
                </Button>
              </div>
              <div className={cx('express_content', 'flex-row flex-wrap justify-content-between')}>
                <div className={cx('express_content_left', 'd-flex flex-row  text-capitalize align-items-center')}>
                  Express
                  {radioSetting.express && radioSetting.cod.express ? (
                    <div> [COD is enabled] </div>
                  ) : !radioSetting.express ? (
                    ''
                  ) : !radioSetting.cod.express ? (
                    <div> [COD is disabled] </div>
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
                    {/* <div className={cx('express_hide_setting_content', 'd-flex flex-row justify-content-between')}>
                      <div className={cx('express_hide_setting_title')}>Activate this shipping unit</div>
                      <div
                        className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                        data-name="express"
                      />
                    </div> */}
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
                      collapse <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  ) : (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      expand <FontAwesomeIcon icon={faChevronUp} />{' '}
                    </div>
                  )}
                </Button>
              </div>
              <div className={cx('fast_content', ' flex-row flex-wrap justify-content-between')}>
                <div className={cx('fast_content_left', 'd-flex flex-row text-capitalize align-items-center')}>
                  fast{' '}
                  {radioSetting.fast && radioSetting.cod.fast ? (
                    <div> [COD is enabled] </div>
                  ) : !radioSetting.fast ? (
                    ''
                  ) : !radioSetting.cod.fast ? (
                    <div> [COD is disabled] </div>
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
                    {/* <div className={cx('fast_hide_setting_content', 'd-flex flex-row justify-content-between')}>
                      <div className={cx('fast_hide_setting_title')}>Activate this shipping unit</div>
                      <div
                        className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                        data-name="fast"
                      />
                    </div> */}
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
                      Collapse <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  ) : (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      expand <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                  )}
                </Button>
              </div>
              <div className={cx('saving_content', ' flex-row flex-wrap justify-content-between')}>
                <div className={cx('saving_content_left', 'd-flex  flex-row text-capitalize align-items-center')}>
                  saving{' '}
                  {radioSetting.saving && radioSetting.cod.saving ? (
                    <div> [COD is enabled] </div>
                  ) : !radioSetting.saving ? (
                    ''
                  ) : !radioSetting.cod.saving ? (
                    <div> [COD is disabled] </div>
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
                    {/* <div className={cx('saving_hide_setting_content', 'd-flex flex-row justify-content-between')}>
                      <div className={cx('saving_hide_setting_title')}>Activate this shipping unit</div>
                      <div
                        className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                        data-name="saving"
                      />
                    </div> */}
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
                <div className={cx('title', 'text-capitalize')}>heavy_things</div>
                <Button className={cx('text-capitalize')} type="button" data-name="heaving_things" small>
                  {btnSetting.heavy_things ? (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      Collapse <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  ) : (
                    <div className={cx('btn_toggle', 'd-flex flew-row align-items-center')}>
                      expand <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                  )}
                </Button>
              </div>
              <div className={cx('heavy_things_content', 'flex-wrap flex-row justify-content-between')}>
                <div className={cx('heavy_things_content_left', 'd-flex flex-row text-capitalize align-items-center')}>
                  heavy things{' '}
                  {radioSetting.heavy_things && radioSetting.cod.heavy_things ? (
                    <div> [COD is enabled] </div>
                  ) : !radioSetting.heavy_things ? (
                    ''
                  ) : !radioSetting.cod.heavy_things ? (
                    <div> [COD is disabled] </div>
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
                    {/* <div className={cx('heavy_things_hide_setting_content', 'd-flex flex-row justify-content-between')}>
                      <div className={cx('heavy_things_hide_setting_title')}>Activate this shipping unit</div>
                      <div
                        className={cx('lifeshop_switch_normal', 'lifeshop_switch lifeshop_switch_open')}
                        data-name="heaving_things"
                      />
                    </div> */}
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
      <div className={cx('btn_setting_shipping', 'd-flex flex-row justify-content-between')}>
        <Button type="button" outline small onClick={handleBackSettingShipping}>
          Back
        </Button>
        <Button type="button" primary small onClick={handleNextSettingShipping}>
          Next
        </Button>
      </div>
    </form>
  );
}
