import HomePages from '~/Pages/FrontEnd/Home';
import config from '~/config';
import SignIn from '~/Pages/FrontEnd/Auth/SignIn';
import Register from '~/Pages/FrontEnd/Auth/Register';
import ProductDetails from '~/Pages/FrontEnd/ProductDetails';
import Cat from '~/Pages/FrontEnd/Cat';

const publicRoutes = [
  { path: config.routes.home, components: HomePages },
  { path: config.routes.signIn, components: SignIn },
  { path: config.routes.register, components: Register },
  { path: config.routes.productdetails, components: ProductDetails },
  { path: config.routes.Cat, components: Cat },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
