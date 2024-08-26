import classNames from 'classnames/bind';
import styles from './EditCategory.module.scss';
import Translate from '~/layout/Component/Translate';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useImmer } from 'use-immer';
import { useState } from 'react';

const cx = classNames.bind(styles);

export default function EditCategory({ onToggle = () => {} }) {
  const [selectCat, setSelectCat] = useImmer({});
  const [disabled, setDisabled] = useState(false);
  const handleConfirmSelectCat = (e) => {
    onToggle('close');
  };
  return (
    <section className={cx('wrapper')}>
      <div className={cx('contain')}>
        <header className={cx('header')}>
          <h4 className="text-capitalize">
            <Translate>edit_category</Translate>
          </h4>
          <Button
            onClick={() => {
              onToggle('close');
            }}
            type="button"
            none_size
            transparent
          >
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </header>
        <main className={cx('main')}></main>
        <footer className={cx('footer', 'd-flex flex-row justify-content-between')}>
          <div className={cx('category_selected')}>
            <label>
              <Translate>selected</Translate>
            </label>
            <div className={cx('no_select')}>
              <Translate>no_select_category</Translate>
            </div>
            {/* <div className={cx('cat_selected_item')}></div> */}
          </div>
          <div className={cx('btn', 'd-flex flex-row')}>
            <Button
              onClick={() => {
                onToggle('close');
              }}
              type="button"
              small
              white
            >
              <Translate>cancel</Translate>
            </Button>
            <Button onClick={handleConfirmSelectCat} type="button" small disabled={disabled}>
              <Translate>confirm</Translate>
            </Button>
          </div>
        </footer>
      </div>
    </section>
  );
}
