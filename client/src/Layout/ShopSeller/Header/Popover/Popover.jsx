import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import styles from '../Header.module.scss';
import MenuIcon from '~/layout/Component/Icon/MenuIcon';

const cx = classNames.bind(styles);

export default function Popover() {
  const [popover, setPopover] = useState(false);

  return (
    <Fragment>
      <Tippy
        interactive
        visible={popover}
        render={(attrs) => <div className={cx('menu_wrapper')} {...attrs} tabIndex="-1"></div>}
      >
        <div className={cx('icon')}>
          <MenuIcon />
        </div>
      </Tippy>
    </Fragment>
  );
}
