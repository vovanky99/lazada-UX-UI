import classNames from 'classnames/bind';
import styles from './AttributesProducts.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function AttributesProducts() {
  return (
    <WrapperMain
      title="attributes"
      BtnAddRender={
        <Button>
          <Translate>add_atributes</Translate>
        </Button>
      }
    ></WrapperMain>
  );
}
