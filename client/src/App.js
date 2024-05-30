import { Routes, Route, useLocation } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

import '~/assets/Styles/GlobalStyles.module.scss';
import '~/assets/Styles//AddStyles.scss';
import '~/assets/Styles/LazyLoad.scss';

import { LifeShopRoutes, AdminRoutes } from '~/routes';
import React from 'react';
import LifeShopLayout from '~/layout/FrontEnd/MainLayout';
import AdminLayout from '~/layout/ADMIN/MainLayout';
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
        if (route.path === `${config.adminRoutes.SignIn}` || route.path === `${config.adminRoutes.ResetPassword}`) {
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
    </Routes>
  );
}

export default App;
