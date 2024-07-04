import classNames from 'classnames/bind';
import styles from './Dialog.module.scss';
import Modal from '../Modal';
import Button from '~/components/Button';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function Dialog({ message, onConfirm = () => {}, onCancel = () => {}, useCancel = true }) {
  return (
    <Modal>
      <Fragment>
        <div id="" className={cx('container', 'text-center d-flex flex-column justify-content-between')}>
          <div className={cx('confirm_header', 'd-flex flex-row justify-content-between align-items-center')}>
            <div className={cx('confirm_note')}>Note</div>
            <div className={cx('confirm_close')}>
              <FontAwesomeIcon icon={faClose} onClick={onCancel} data-type="no" />
            </div>
          </div>
          <div className={cx('confirm_text')}>
            <p>{message}</p>
          </div>
          <div className={cx('confirm_footer', 'd-flex flex-row justify-content-end')}>
            {useCancel ? (
              <Button className={cx('button_cancel')} onClick={onCancel} type="button" outline small data-type="no">
                No
              </Button>
            ) : (
              ''
            )}
            <Button className={cx('button_accept')} onClick={onConfirm} type="button" small primary data-type="yes">
              Yes
            </Button>
          </div>
        </div>
      </Fragment>
    </Modal>
  );
}
