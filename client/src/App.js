import { Routes, Route, useLocation } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

import './GlobalStyles/GlobalStyles.module.scss';
import './GlobalStyles//AddStyles.scss';
import './GlobalStyles/LazyLoad.scss';

import { LifeShopRoutes, AdminRoutes } from '~/Routes';
import React from 'react';
import LifeShopLayout from '~/Layout/FrontEnd/MainLayout';
import AdminLayout from '~/Layout/ADMIN/MainLayout';

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
        if (route.path === '/admin/auth/login' || route.path === '/admin/auth/resetpassword') {
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
