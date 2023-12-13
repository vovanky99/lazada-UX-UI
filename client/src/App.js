import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';

import './GlobalStyles/GlobalStyles.module.scss';
import { publicRoutes } from '~/Routes';
import MainLayout from '~/components/Layout/MainLayout';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

function App() {
  // console.log(publicRoutes)
  return (
    <Routers>
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
    </Routers>
  );
}

export default App;
