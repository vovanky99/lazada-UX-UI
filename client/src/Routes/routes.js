import HomePages from '~/Pages/Home';
import config from '~/config';
import SignIn from '~/Pages/Auth/SignIn';
import Register from '~/Pages/Auth/Register';
import ProductDetails from '~/Pages/ProductDetails';
import Cat from '~/Pages/Cat';

const publicRoutes = [
  { path: config.routes.home, components: HomePages },
  { path: config.routes.signIn, components: SignIn },
  { path: config.routes.register, components: Register },
  { path: config.routes.productdetails, components: ProductDetails },
  { path: config.routes.Cat, components: Cat },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
