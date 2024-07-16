import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from '../RegisterShop.module.scss';
import Button from '~/components/Button';
import MessageText from '~/layout/Component/Message/MessageText';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

const EmailItem = forwardRef(function EmailItem(
  { dt, closeMark = false, MaxLength, handleOnchange = () => {}, handleRemoveEmail = () => {} },
  ref,
) {
  const [value, setValue] = useState(dt?.value || '');

  return (
    <div id={dt?.name} className={cx('email_wrapper', 'd-flex flex-row align-items-center')}>
      <div className={cx('email_content')}>
        <div className={cx('email_content_main')}>
          <input
            ref={ref}
            type="text"
            name={dt?.name}
            value={value}
            onChange={(e) => {
              const { maxLength, value } = e.target;
              if (MaxLength) {
                setValue(value.slice(0, maxLength - 1));
              } else {
                setValue(value);
              }
              handleOnchange(e);
            }}
            autoComplete="true"
            placeholder={Translate({ children: 'placeholder.default' })}
            className={cx(`${dt?.name}`, dt?.error ? 'border_danger' : '', ' email_item form-control')}
            maxLength={MaxLength}
          />
          <div className={cx('email_length')}>
            {value.length}/{MaxLength}
          </div>
        </div>
        <MessageText message={dt?.error} className={cx('message', 'text-start text-danger')} />
      </div>
      {closeMark ? (
        <Button
          type="button"
          data-name={dt?.name}
          className={cx('email_remove')}
          onClick={(e) => {
            handleRemoveEmail(e);
          }}
          transparent
          none_size
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      ) : (
        ''
      )}
    </div>
  );
});

export default EmailItem;
