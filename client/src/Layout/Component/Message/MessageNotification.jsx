import classNames from 'classnames/bind';

import styles from './Mesage.module.scss';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

export default function MessageNotification({ message, classNames = '', delay = 500 }) {
  const messRef = useRef();
  useEffect(() => {
    const func = () => {
      if (message) {
        const mess = messRef.current;
        mess.style.display = 'flex';
        mess.style.animationDuration = `${delay}ms`;
        mess.style.animationName = `message_notification`;
        const close = setTimeout((mess.style.animationName = `message_notification_close`), 1000 + delay);
        clearTimeout(close);
        // const add = setTimeout((mess.style.display = 'none'), delay + 500 + delay);
        // clearTimeout(add);
      }
    };
    func();
  }, [message]);
  return (
    <>
      {message && (
        <div
          ref={messRef}
          className={cx(
            'message_notification',
            classNames +
              'flex-column justify-content-center align-items-center text-center text-success text-capitalize',
          )}
        >
          {message}
        </div>
      )}
    </>
  );
}
