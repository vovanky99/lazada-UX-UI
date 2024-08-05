import classNames from 'classnames/bind';
import styles from './AttributesDetails.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import Translate from '~/layout/Component/Translate';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddAttrDetails from './AddAttrDetails';

const cx = classNames.bind(styles);

export default function AttributesDetails() {
  const { language } = useSelector((state) => state.Auth);
  const [toggleAdd, setToggleAdd] = useState(false);

  const handleToggleAdd = () => {
    if (toggleAdd) {
      setToggleAdd(false);
    } else {
      setToggleAdd(true);
    }
  };

  return (
    <WrapperMain
      title="attributes"
      BtnAddRender={
        <Button className={cx('text-capitalize')} type="button" small gradient_primary onClick={handleToggleAdd}>
          <Translate>add_attributes_details</Translate>
        </Button>
      }
    >
      <AddAttrDetails handleToggleAdd={handleToggleAdd} closeModal={toggleAdd} language={language} />
    </WrapperMain>
  );
}
