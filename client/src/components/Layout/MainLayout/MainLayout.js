import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Footer from '~/components/Layout/Footer';
import Header from '~/components/Layout/Header';
import styles from './mainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  return (
    <Container fluid className={cx('wrapper')}>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
