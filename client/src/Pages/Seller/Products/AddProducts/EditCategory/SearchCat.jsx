import classNames from 'classnames/bind';
import styles from './EditCategory.module.scss';
import Translate from '~/layout/Component/Translate';
import Button from '~/components/Button';
import SeachIcon from '~/layout/Component/Icon/SeachIcon';
import { useEffect, useState } from 'react';
import useDebounce from '~/hooks/Debounce/Debounce';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function SearchCat({ searchValue = () => {} }) {
  const [value, setValue] = useState('');
  const { timeDelay } = useSelector((state) => state.Auth);
  const debounce = useDebounce(value, timeDelay);
  useEffect(() => {
    searchValue(debounce);
  }, [debounce]);
  return (
    <div className={cx('search', 'form-group')}>
      <input
        name="search"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        className="form-control"
        placeholder={Translate({ children: 'pages.seller.add_product.edit_cat.search' })}
      />
      <Button transparent type="button">
        <SeachIcon />
      </Button>
    </div>
  );
}
