import classNames from 'classnames/bind';
import styles from '../LogoBars.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import useDebounce from '~/Hooks/Debounce/Debounce';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

export default function SearchResult({ title, lengthBold, delay, searchValue, id }) {
  // const debounce = useDebounce(lengthBold, 600);
  useEffect(() => {
    const length_bold = document.querySelectorAll('.length-bold');
    for (let i = 0; i < length_bold.length; i++) {
      let b = length_bold[i].textContent.slice(0, lengthBold);
      length_bold[i].innerHTML = length_bold[i].textContent.replace(b, `<b>${b}</b>`);
    }
  }, [searchValue]);

  return (
    <>
      <Link to={`/search`} className={cx('search-result-el', 'd-flex justify-content-between')}>
        <span className={cx('length-bold')}>{title}</span>
        <FontAwesomeIcon icon={faArrowUp} />
      </Link>
    </>
  );
}
