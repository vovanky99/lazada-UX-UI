import config from '~/config';

// public route
import HomePages from '~/pages/FrontEnd/Home';
import SignIn from '~/pages/FrontEnd/Auth/SignIn';
import Register from '~/pages/FrontEnd/Auth/Register';
import ProductDetails from '~/pages/FrontEnd/ProductDetails';
import Cat from '~/pages/FrontEnd/Cat';
import Search from '~/pages/FrontEnd/Search';
import Cart from '~/pages/FrontEnd/Cart';
import Profile from '~/pages/FrontEnd/Account/Profile';
import Order from '~/pages/FrontEnd/Account/Order';
import Address from '~/pages/FrontEnd/Account/Address';
import UserBank from '~/pages/FrontEnd/Account/UserBank';
import Error from '~/pages/FrontEnd/Error';

//route admin
import AdminLogin from '~/pages/ADMIN/Auth/Login';
import AdminHome from '~/pages/ADMIN/Home';
import AllAdmin from '~/pages/ADMIN/Admin/AllAdmin';
import EditAdmin from '~/pages/ADMIN/Admin/EditAdmin';
import AllShop from '~/pages/ADMIN/Shop/AllShop';
import AddShop from '~/pages/ADMIN/Shop/AddShop';
import EditShop from '~/pages/ADMIN/Shop/EditShop';
import ProfileAdmin from '~/pages/ADMIN/Profile';
import LocationAdmin from '~/pages/ADMIN/Location';
import AddAdmin from '~/pages/ADMIN/Admin/AddAdmin';
import Category from '~/pages/ADMIN/Category';
import AllUser from '~/pages/ADMIN/User/AllUser';
import AddUser from '~/pages/ADMIN/User/AddUser';
import EditUser from '~/pages/ADMIN/User/EditUser';

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
    breadcrumbName: 'DashBoard',
  },
  {
    path: config.adminRoutes.AllAdmin,
    components: AllAdmin,
    breadcrumbName: 'All Admin',
  },
  {
    path: config.adminRoutes.EditAdmin,
    components: EditAdmin,
    breadcrumbName: 'Edit Admin',
  },
  {
    path: config.adminRoutes.AddAdmin,
    components: AddAdmin,
    breadcrumbName: 'Add Admin',
  },
  {
    path: config.adminRoutes.AllShop,
    components: AllShop,
    breadcrumbName: 'All Shop',
  },
  {
    path: config.adminRoutes.AddShop,
    components: AddShop,
    breadcrumbName: 'Add Shop',
  },
  {
    path: config.adminRoutes.EditShop,
    components: EditShop,
    breadcrumbName: 'Edit Shop',
  },
  {
    path: config.adminRoutes.ProfileAdmin,
    components: ProfileAdmin,
    breadcrumbName: 'Profile',
  },
  {
    path: config.adminRoutes.Location,
    components: LocationAdmin,
    breadcrumbName: 'Location',
  },
  {
    path: config.adminRoutes.Category,
    components: Category,
    breadcrumbName: 'Category',
  },
  {
    path: config.adminRoutes.AllUser,
    components: AllUser,
    breadcrumbName: 'All User',
  },
  {
    path: config.adminRoutes.AddUser,
    components: AddUser,
    breadcrumbName: 'Add User',
  },
  {
    path: config.adminRoutes.EditUser,
    components: EditUser,
    breadcrumbName: 'Edit User',
  },
];

const ManageShopRoutes = [{}];

export { LifeShopRoutes, AdminRoutes, ManageShopRoutes };
