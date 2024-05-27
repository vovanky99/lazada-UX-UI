import Button from '~/components/Button';
import { AdminRoutes, LifeShopRoutes, ManageShopRoutes } from '~/routes';
import { useEffect, useState } from 'react';

export default function Bread({ path, rolePath, disabled = false, className, children }) {
  const [routes, setRoutes] = useState(null);
  const [value, setvalue] = useState(null);

  useEffect(() => {
    const render = () => {
      if (routes != null) {
        const r = routes.filter((e) => e.path === path);
        r.map((e) => setvalue(r));
      }
    };
    render();
  }, [routes, path]);
  useEffect(() => {
    if (rolePath === 'admin') {
      setRoutes(AdminRoutes);
    } else if (rolePath === 'client') {
      setRoutes(LifeShopRoutes);
    } else {
      setRoutes(ManageShopRoutes);
    }
  }, [path]);
  return (
    <>
      {value
        ? value.map((v, index) => (
            <Button to={`${v.path}`} key={index} className={className} disabled={disabled}>
              {v.breadcrumbName}
              {children}
            </Button>
          ))
        : ''}
    </>
  );
}
