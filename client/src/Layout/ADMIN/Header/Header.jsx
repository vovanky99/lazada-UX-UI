import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { faEnvelope } from '@fortawesome/fontawesome-free-regular';

import styles from './Header.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';
import config from '~/config';
import Store from '~/redux/Store';
import { AdminLogout, setSession } from '~/redux/Actions/Auth';
import { Logo } from '~/api/Logo/GetLogo';
import AdminLogo from './Logo/AdminLogo';

const cx = classNames.bind(styles);

export default function Header() {
  const dispatch = useDispatch();
  const logoRef = useRef();
  const navMenuRef = useRef();
  const btnAccountRef = useRef();
  const btnMessageRef = useRef();
  const admin = useSelector((state) => state.Auth.admin);
  const [showAccount, setShowAccount] = useState(false);
  const [showMessageNTF, setShowMessageNTF] = useState(false);
  const [logo, setLogo] = useState(null);

  /* handle account tippy click outside */
  const ClickOutsideTippyAccount = () => {
    setShowAccount(false);
  };

  /*handle message tippy click outside */
  const ClickOutsideTippyMessage = () => {
    setShowMessageNTF(false);
  };

  /* logout */
  const handleClickLogout = (e) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      Store.dispatch(AdminLogout());
      dispatch(setSession('', 'adminToken'));
    }
  };

  /* get logo */
  useEffect(() => {
    Logo()
      .then((result) => {
        setLogo(result[0]);
      })
      .catch((e) => console.log(e));
  }, [logo]);

  /* account toggle */
  useEffect(() => {
    const b = btnAccountRef.current;
    const handleClickAccount = (e) => {
      if (showAccount === true) {
        setShowAccount(false);
      } else {
        setShowAccount(true);
      }
    };
    if (b) {
      b.addEventListener('click', handleClickAccount);
    }
    return () => {
      if (b) {
        b.removeEventListener('click', handleClickAccount);
      }
    };
  }, [showAccount]);

  /* message toggle */
  useEffect(() => {
    const m = btnMessageRef.current;
    const handleClickMessage = (e) => {
      if (showMessageNTF === true) {
        setShowMessageNTF(false);
      } else {
        setShowMessageNTF(true);
      }
    };
    if (m) {
      m.addEventListener('click', handleClickMessage);
    }
    return () => {
      if (m) {
        m.removeEventListener('click', handleClickMessage);
      }
    };
  }, [showMessageNTF]);
  return (
    <header className={cx('header', 'd-flex flex-row')}>
      <Link ref={logoRef} className={cx('header_logo', 'd-flex justify-content-center')} to={'/admin'}>
        <div className={cx('img-contain', 'd-flex align-items-center')}>
          <AdminLogo data={logo} />
        </div>
      </Link>
      <div className={cx('header_navbar-menu', 'd-flex justify-content-between flex-grow-1')}>
        <div className={cx('navbar-menu_left', 'd-flex')}>
          <Button className={cx('navbar-toggler')} ref={navMenuRef} transparent>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
        <div className={cx('navbar-menu_right', 'd-flex flex-row align-items-center')}>
          <div className={cx('message')}>
            <Tippy
              interactive
              visible={showMessageNTF}
              render={(attrs) => (
                <div className={cx('message_toggle', 'd-flex flex-column')} {...attrs}>
                  <h4 className={cx('title')}>Messages</h4>
                  <div className={cx('content')}>
                    <Link className={cx('element', 'd-flex flex-row')} to={`/admin`}>
                      <div className={cx('element_account')}>
                        <Images src={`null`} />
                      </div>
                      <div className={cx('element_content')}>
                        <h6>Mark send you a message</h6>
                        <time>1 Minutes ago</time>
                      </div>
                    </Link>
                  </div>
                  <div className={cx('total-mes-new')}>4 new message</div>
                </div>
              )}
              onClickOutside={ClickOutsideTippyMessage}
            >
              <Button ref={btnMessageRef} className={cx('message_icon')} transparent>
                <FontAwesomeIcon icon={faEnvelope} />
              </Button>
            </Tippy>
          </div>
          <div className={cx('account')}>
            <Tippy
              interactive
              visible={showAccount}
              render={(attrs) => (
                <div className={cx('account_toggle', 'd-flex flex-column')} {...attrs}>
                  <Button className={cx('btn-profile')} to={config.adminRoutes.ProfileAdmin} transparent>
                    My Profile
                  </Button>
                  <Button className={cx('logout')} transparent onClick={handleClickLogout}>
                    Logout
                  </Button>
                </div>
              )}
              onClickOutside={ClickOutsideTippyAccount}
            >
              <Button ref={btnAccountRef} className={cx('account_profile')} transparent>
                <div className={cx('avatar')}>
                  <Images src={`${admin.avatar}`} />
                </div>
                <div className={cx('d-flex align-items-center flex-row')}>
                  <p>{admin.name}</p> <FontAwesomeIcon icon={faAngleDown} />
                </div>
              </Button>
            </Tippy>
          </div>
        </div>
      </div>
    </header>
  );
}
