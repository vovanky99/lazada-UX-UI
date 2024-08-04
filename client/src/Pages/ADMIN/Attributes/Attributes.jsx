import classNames from 'classnames/bind';
import styles from './Attributes.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import Translate from '~/layout/Component/Translate';
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddAttributes from './AddAttributes';

const cx = classNames.bind(styles);

export default function Attributes() {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [reloadData, setReloadData] = useState(1);
  const [data, setData] = useImmer({
    name: '',
    category_id: '',
  });

  const handleTonggleAdd = (e) => {
    if (toggleAdd) {
      setToggleAdd(false);
    } else {
      setToggleAdd(true);
    }
  };

  const handleReloadData = (value) => {
    setReloadData(reloadData + value);
  };

  return (
    <WrapperMain
      title="attributes"
      BtnAddRender={
        <Button onClick={handleTonggleAdd} className={cx('text-capitalize')} gradient_primary small>
          <Translate>add_attributes</Translate>
        </Button>
      }
    >
      <AddAttributes closeModal={toggleAdd} handleReloadData={handleReloadData} handleClose={handleTonggleAdd} />
    </WrapperMain>
  );
}
