import config from '~/config';
import HomePages from '~/Pages/FrontEnd/Home';
import SignIn from '~/Pages/FrontEnd/Auth/SignIn';
import Register from '~/Pages/FrontEnd/Auth/Register';
import ProductDetails from '~/Pages/FrontEnd/ProductDetails';
import Cat from '~/Pages/FrontEnd/Cat';
import Search from '~/Pages/FrontEnd/Search';
import Cart from '~/Pages/FrontEnd/Cart';

const publicRoutes = [
  { path: config.routes.home, components: HomePages },
  { path: config.routes.signIn, components: SignIn },
  { path: config.routes.register, components: Register },
  { path: config.routes.productdetails, components: ProductDetails },
  { path: config.routes.cat, components: Cat },
  { path: config.routes.search, components: Search },
  { path: config.routes.cart, components: Cart },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
