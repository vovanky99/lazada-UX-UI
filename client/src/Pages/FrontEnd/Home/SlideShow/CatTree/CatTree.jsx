import classNames from 'classnames/bind';
import styles from '../SlideShow.module.scss';
import CatChild from './CatChild';

const cx = classNames.bind(styles);

export default function CatTree({ personData }) {
  return (
    <>
      <ul className={cx('cat-container')}>
        <CatChild key={personData.id} id={personData.id} slug={personData.slug} name={personData.title} />

        {personData.children_recursive != '' && (
          <ul className={cx('cat-child-container', 'd-flex flex-column')}>
            {personData.children_recursive.map((d, index) => (
              <CatTree key={index} personData={d} />
            ))}
          </ul>
        )}
      </ul>
    </>
  );
}
