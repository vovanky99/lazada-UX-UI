import config from '~/config';

// public route
import HomePages from '~/Pages/FrontEnd/Home';
import SignIn from '~/Pages/FrontEnd/Auth/SignIn';
import Register from '~/Pages/FrontEnd/Auth/Register';
import ProductDetails from '~/Pages/FrontEnd/ProductDetails';
import Cat from '~/Pages/FrontEnd/Cat';
import Search from '~/Pages/FrontEnd/Search';
import Cart from '~/Pages/FrontEnd/Cart';
import Profile from '~/Pages/FrontEnd/Account/Profile';
import Order from '~/Pages/FrontEnd/Account/Order';
import Address from '~/Pages/FrontEnd/Account/Address';
import UserBank from '~/Pages/FrontEnd/Account/UserBank';
import Error from '~/Pages/FrontEnd/Error';

//route admin
import AdminLogin from '~/Pages/ADMIN/Auth/Login';
import AdminHome from '~/Pages/ADMIN/Home';

const LifeShopRoutes = [
  { path: config.routes.home, components: HomePages },
  { path: config.routes.signIn, components: SignIn },
  { path: config.routes.register, components: Register },
  { path: config.routes.productdetails, components: ProductDetails },
  { path: config.routes.cat, components: Cat },
  { path: config.routes.search, components: Search },
  { path: config.routes.cart, components: Cart },
  { path: config.routes.profile, components: Profile },
  { path: config.routes.address, components: Address },
  { path: config.routes.purchaseOrder, components: Order },
  { path: config.routes.userbank, components: UserBank },
  { path: config.routes[404], components: Error },
];

const AdminRoutes = [
  { path: config.adminRoutes.SignIn, components: AdminLogin },
  {
    path: config.adminRoutes.Home,
    components: AdminHome,
  },
];

export { LifeShopRoutes, AdminRoutes };
