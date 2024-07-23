import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

export default function Modal({ id, children, closeModal = true, modalEdit = false, delay = 600 }) {
  useEffect(() => {
    const modal = document.getElementById(`${id}`);
    const mainContent = document.getElementById('modal_main_content');
    if (modal && mainContent) {
      modal.style.animationDuration = `${delay}ms`;
      mainContent.style.animationDuration = `${delay}ms`;
      if (!closeModal) {
        if (modal.style.animationName === '') {
          modal.style.animationName = 'closeModal';
          if (modalEdit) {
            mainContent.style.animationName = 'closeModalEditChild';
          } else {
            mainContent.style.animationName = 'closeModalChild';
          }
          const add = setTimeout((modal.style.display = 'none'), delay);
          clearTimeout(add);
        }
      } else {
        if (modal.style.animationName === 'closeModal') {
          if (modalEdit) {
            mainContent.style.animationName = 'showModalEditChild';
          } else {
            mainContent.style.animationName = 'showModalChild';
          }
          modal.style.animationName = '';
          modal.style.display = 'flex';
        }
      }
    }
  }, [closeModal, id]);
  return (
    <div
      id={`${id}`}
      className={cx('wrapper', modalEdit ? 'justify-content-end' : 'justify-content-center align-items-center')}
      tabIndex={-1}
      role="dialog"
    >
      <div className={cx('main')}>
        <div id="modal_main_content" className={cx('main_content')}>
          {children}
        </div>
      </div>
    </div>
  );
}
