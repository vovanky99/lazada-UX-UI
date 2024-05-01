import { Routes, Route } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

import './GlobalStyles/GlobalStyles.module.scss';
import './GlobalStyles/active.scss';
import './GlobalStyles/LazyLoad.scss';

import { publicRoutes, privateRoutes } from '~/Routes';
import React, { Suspense } from 'react';
import MainLayout from '~/Layout/FrontEnd/MainLayout';

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
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
                <MainLayout>
                  <Pages />
                </MainLayout>
              </ThemeProvider>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
