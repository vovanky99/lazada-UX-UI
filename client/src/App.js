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
import SellerSubLayout from './layout/ShopSeller/SubLayout';
import config from './config';

function App() {
  return (
    <Routes>
      {LifeShopRoutes.map((route, index) => {
        const Pages = route.components;
        if (!route.MainLayout) {
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
                  <Pages />
                </ThemeProvider>
              }
            />
          );
        } else {
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
        }
      })}
      {AdminRoutes.map((route, index) => {
        const Pages = route.components;
        if (!route.MainLayout) {
          return <Route key={index} path={route.path} element={<Pages />} />;
        } else {
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
        }
      })}
      {ShopSellerRoutes.map((route, index) => {
        const Pages = route.components;
        const layout = route.MainLayout;
        if (layout === 0) {
          return <Route key={index} path={route.path} element={<Pages />} />;
        } else if (layout === 2) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <SellerSubLayout>
                  <Pages />
                </SellerSubLayout>
              }
            />
          );
        } else {
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
        }
      })}
    </Routes>
  );
}

export default App;
