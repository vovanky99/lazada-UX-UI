import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Footer from '~/Layout/FrontEnd/Footer';
import Header from '~/Layout/FrontEnd/Header';
import styles from './mainLayout.module.scss';
import Main from '../Main';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  return (
    <div className={cx('wrapper', 'container-fluid')}>
      <Header />
      <Main children={children} />
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
