import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import LanguageTippy from '@tippyjs/react/headless';

import config from '~/config';
import styles from '../Header.module.scss';
import Store from '~/redux/Store';
import { Logout, setSession } from '~/redux/Actions/Auth';
import Dialog from '~/layout/Component/Dialog';
import Images from '~/components/Images';
import ShopIcon from '~/layout/Component/Icon/ShopIcon';
import LogoutIcon from '~/layout/Component/Icon/LogoutIcon';
import LanguageIcon from '~/layout/Component/Icon/LanguageIcon';
import SettingIcon from '~/layout/Component/Icon/SettingIcon';
import useDebounce from '~/hooks/Debounce';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ChangeLanguage } from '~/redux/Actions/General';
import Translates from '~/layout/Component/Translate/Translates';

const cx = classNames.bind(styles);

export default function Account({ isRegisterShop }) {
  const navigate = useNavigate();
  const { seller, sellerAuthenticated, language } = useSelector((state) => state.Auth);
  const [account, setAccount] = useState(false);
  const [changeLanguage, setChangeLanguage] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState('');
  const [defaultLanguage, setDefaultLanguage] = useState('vietnamese');
  const [resolvePromise, setResolvePromise] = useState(null);

  const accountTippy = useDebounce(account, 500);
  const handleAccountMouseOver = () => {
    setAccount(true);
  };
  const handleAccountMouseLeave = () => {
    setAccount(false);
  };
  const handleOnMouseOverChangeLanguage = (e) => {
    setChangeLanguage(true);
  };
  const handleOnMouseLeaveChangeLanguage = (e) => {
    setChangeLanguage(false);
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
  const handleLogoutSeller = async () => {
    const log = await setShowConfirmBox('Thông tin đã cung cấp sẽ không được lưu. Bạn có chắc vẫn muốn đăng xuất?');
    if (log) {
      Store.dispatch(Logout());
      Store.dispatch(setSession('', 'sellerToken'));
      navigate(config.ShopSeller.SignIn);
    }
  };
  useEffect(() => {
    const language = document.querySelectorAll('.language-item');
    const handleChangeLanguage = (e) => {
      const { acronym, value } = e.currentTarget.dataset;
      if (!e.currentTarget.classList.contains('text_primary_active')) {
        for (let i = 0; i < language.length; i++) {
          if (language[i].classList.contains('text_primary_active')) {
            language[i].classList.remove('text_primary_active');
            break;
          }
        }
        e.currentTarget.classList.add('text_primary_active');
      }
      setChangeLanguage(false);
      setDefaultLanguage(value);
      Store.dispatch(ChangeLanguage(acronym));
    };
    if (language) {
      language.forEach((d) => d.addEventListener('click', handleChangeLanguage));
    }
    return () => {
      if (language) {
        language.forEach((d) => d.removeEventListener('click', handleChangeLanguage));
      }
    };
  }, [changeLanguage]);
  return (
    <Fragment>
      <div
        className={cx('seller_header_account')}
        onMouseLeave={handleAccountMouseLeave}
        onMouseOver={handleAccountMouseOver}
      >
        <Tippy
          interactive
          visible={accountTippy}
          offset={[-80, 5]}
          placement="bottom"
          render={(attrs) => (
            <div className={cx('account_dropdown')} {...attrs} tabIndex={-1}>
              <div className={cx('account_container', 'd-flex flex-column align-items-center')}>
                <div className={cx('account_header', 'd-flex  flex-column  align-items-center')}>
                  <div className={cx('seller_avatar')}>
                    <Images
                      src={seller?.avatar || require('~/assets/images/avatar/no-avatar.jpg')}
                      alt={seller?.avatar || require('~/assets/images/avatar/no-avatar.jpg')}
                    />
                  </div>
                  <div className={cx('seller_fullname', 'text-center')}>{seller.name || 'No Name'}</div>
                </div>
                {!isRegisterShop && (
                  <div className={cx('account_middle', 'd-flex flex-column alig-items-start text-capitalize')}>
                    <Button to={config.ShopSeller.SettingShopInfo} transparent>
                      <ShopIcon />
                      <Translates>shopInfo</Translates>
                    </Button>
                    <Button to={config.ShopSeller.SettingNotification} transparent>
                      <SettingIcon />
                      <Translates>shopSetting</Translates>
                    </Button>
                    <div
                      className={cx('language_container')}
                      onMouseLeave={handleOnMouseLeaveChangeLanguage}
                      onMouseOver={handleOnMouseOverChangeLanguage}
                    >
                      <LanguageTippy
                        interactive
                        visible={changeLanguage}
                        placement="bottom-start"
                        offset={[0, 0]}
                        render={(attrs) => (
                          <div className={cx('change_language', 'text-capitalize')} {...attrs} tabIndex="-1">
                            <Button
                              className={cx('language-item text_primary_active')}
                              data-value="vietnamese"
                              data-acronym="vi"
                              transparent
                            >
                              Tiếng Việt (Vietnamese)
                            </Button>
                            <Button className={cx('language-item')} data-value="english" data-acronym="en" transparent>
                              English
                            </Button>
                          </div>
                        )}
                      >
                        <Button className={cx('text-capitalize')} type="button" transparent>
                          <LanguageIcon />
                          {defaultLanguage}
                        </Button>
                      </LanguageTippy>
                    </div>
                  </div>
                )}
                <Button
                  className={cx('seller_logout', 'd-flex flex-row justify-content-start')}
                  type="button"
                  onClick={handleLogoutSeller}
                  transparent
                >
                  <LogoutIcon />
                  <Translates>logout</Translates>
                </Button>
              </div>
            </div>
          )}
        >
          <Button
            type="button"
            className={cx('header_right_account', 'd-flex flex-row align-items-center')}
            transparent
          >
            <div className={cx('seller_avatar')}>
              <Images
                src={seller?.avatar || require('~/assets/images/avatar/no-avatar.jpg')}
                alt={seller?.avatar || require('~/assets/images/avatar/no-avatar.jpg')}
              />
            </div>
            <div className={cx('seller_fullname')}>{seller.name || 'No Name'}</div>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faChevronDown} />
              <FontAwesomeIcon icon={faChevronUp} />
            </div>
          </Button>
        </Tippy>
      </div>
      {dialog && <Dialog message={messageDialog} onCancel={handleConfirmDialog} onConfirm={handleConfirmDialog} />}
    </Fragment>
  );
}
