import { Routes, Route } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

import '~/assets/Styles/animation.scss';
import '~/assets/Styles/Reset.scss';
import '~/assets/Styles/Variable.scss';
import '~/assets/Styles/Styles.scss';
import '~/assets/Styles/LazyLoad.scss';

import { LifeShopRoutes, AdminRoutes, ShopSellerRoutes } from '~/routes';
import React from 'react';
import LifeShopLayout from '~/layout/FrontEnd/MainLayout';
import AdminLayout from '~/layout/ADMIN/MainLayout';
import SellerLayout from '~/layout/ShopSeller/MainLayout';
import config from './config';

function App() {
  return (
    <Routes>
      {LifeShopRoutes.map((route, index) => {
        const Pages = route.components;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <ThemeProvider
                dir="rtl"
                breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                minBreakpoint="xxs"
              >
                <LifeShopLayout>
                  <Pages />
                </LifeShopLayout>
              </ThemeProvider>
            }
          />
        );
      })}
      {AdminRoutes.map((route, index) => {
        const Pages = route.components;
        if (
          route.path === `${config.adminRoutes.SignIn}` ||
          route.path === `${config.adminRoutes.ResetPassword}` ||
          route.path === `${config.ShopSeller.VerifiedEmail}`
        ) {
          return <Route key={index} path={route.path} element={<Pages />} />;
        }
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <AdminLayout>
                <Pages />
              </AdminLayout>
            }
          />
        );
      })}
      {ShopSellerRoutes.map((route, index) => {
        const Pages = route.components;
        if (
          route.path === `${config.ShopSeller.SignIn}` ||
          route.path === `${config.ShopSeller.SignUp}` ||
          route.path === `${config.ShopSeller.ResetPass}` ||
          route.path === `${config.ShopSeller.VerifiedEmail}` ||
          route.path === `${config.ShopSeller.RegisterShop}` ||
          route.path === `${config.ShopSeller.LinkResetPass}`
        ) {
          return <Route key={index} path={route.path} element={<Pages />} />;
        }
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <SellerLayout>
                <Pages />
              </SellerLayout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
