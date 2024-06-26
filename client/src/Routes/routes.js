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
import EditShop from '~/pages/ADMIN/Shop/EditShop';
import ProfileAdmin from '~/pages/ADMIN/Profile';
import LocationAdmin from '~/pages/ADMIN/Location';
import AddAdmin from '~/pages/ADMIN/Admin/AddAdmin';
import Category from '~/pages/ADMIN/Category';
import AllUser from '~/pages/ADMIN/User/AllUser';
import EditUser from '~/pages/ADMIN/User/EditUser';
import Voucher from '~/pages/ADMIN/Voucher';
import Role from '~/pages/ADMIN/Role';
import Blog from '~/pages/ADMIN/Blog';
import Department from '~/pages/ADMIN/Department';
import Manufacturer from '~/pages/ADMIN/Manufacturer';
import ReportProduct from '~/pages/ADMIN/ReportProduct';
import AddVoucher from '~/pages/ADMIN/Voucher/AddVoucher';
import EditVoucher from '~/pages/ADMIN/Voucher/EditVoucher';
import OrderProduct from '~/pages/ADMIN/OrderProduct';
import EditBlog from '~/pages/ADMIN/Blog/EditBlog';
import AddBlog from '~/pages/ADMIN/Blog/AddBlog';
import Logo from '~/pages/ADMIN/Logo';
import AddLogo from '~/pages/ADMIN/Logo/AddLogo';
import AddManu from '~/pages/ADMIN/Manufacturer/AddManu';
import EditManu from '~/pages/ADMIN/Manufacturer/Editmanu/EditManu';
import AllProduct from '~/pages/ADMIN/Product/AllProduct';
import EditProduct from '~/pages/ADMIN/Product/EditProduct';
import ChangePassword from '~/pages/ADMIN/ChangePassword';
import ResetPass from '~/pages/ADMIN/Auth/ResetPass';

// route Seller
import SignUpSeller from '~/pages/Seller/Auth/Register';
import SignInSeller from '~/pages/Seller/Auth/SignIn';
import VerifiedEmailSeller from '~/pages/Seller/Auth/VerifiedEmail';
import HomeSeller from '~/pages/Seller/Home';
import LinkResetPassSeller from '~/pages/Seller/Auth/LinkResetPassword';
import ResetPassSeller from '~/pages/Seller/Auth/ResetPassword';
import RegisterShopSeller from '~/pages/Seller/RegisterShop';

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
    path: config.adminRoutes.EditUser,
    components: EditUser,
    breadcrumbName: 'Edit User',
  },
  {
    path: config.adminRoutes.Role,
    components: Role,
    breadcrumbName: 'Role',
  },
  {
    path: config.adminRoutes.Voucher,
    components: Voucher,
    breadcrumbName: 'Voucher',
  },
  {
    path: config.adminRoutes.AddVoucher,
    components: AddVoucher,
    breadcrumbName: 'Add Voucher',
  },
  {
    path: config.adminRoutes.EditVoucher,
    components: EditVoucher,
    breadcrumbName: 'Edit Voucher',
  },
  {
    path: config.adminRoutes.Blogs,
    components: Blog,
    breadcrumbName: 'Blog',
  },
  {
    path: config.adminRoutes.EditBlogs,
    components: EditBlog,
    breadcrumbName: 'Edit Blog',
  },
  {
    path: config.adminRoutes.AddBlogs,
    components: AddBlog,
    breadcrumbName: 'Add Blog',
  },
  {
    path: config.adminRoutes.Department,
    components: Department,
    breadcrumbName: 'Department',
  },
  {
    path: config.adminRoutes.Manufacturer,
    components: Manufacturer,
    breadcrumbName: 'Manufacturer',
  },
  {
    path: config.adminRoutes.AddManufacturer,
    components: AddManu,
    breadcrumbName: 'Add Manufacturer',
  },
  {
    path: config.adminRoutes.EditManufacturer,
    components: EditManu,
    breadcrumbName: 'Edit Manufacturer',
  },
  {
    path: config.adminRoutes.ReportProduct,
    components: ReportProduct,
    breadcrumbName: 'Report Product',
  },
  {
    path: config.adminRoutes.OrderProduct,
    components: OrderProduct,
    breadcrumbName: 'Order',
  },
  {
    path: config.adminRoutes.Logo,
    components: Logo,
    breadcrumbName: 'Logo',
  },
  {
    path: config.adminRoutes.AddLogo,
    components: AddLogo,
    breadcrumbName: 'Add Logo',
  },
  {
    path: config.adminRoutes.AllProduct,
    components: AllProduct,
    breadcrumbName: 'All Product',
  },
  {
    path: config.adminRoutes.EditProduct,
    components: EditProduct,
    breadcrumbName: 'Edit Product',
  },
  {
    path: config.adminRoutes.ChangePassword,
    components: ChangePassword,
    breadcrumbName: '',
  },
  {
    path: config.adminRoutes.ResetPassword,
    components: ResetPass,
    breadcrumbName: '',
  },
];

const ShopSellerRoutes = [
  { path: config.ShopSeller.SignUp, components: SignUpSeller, breadcrumbName: '' },
  { path: config.ShopSeller.SignIn, components: SignInSeller, breadcrumbName: '' },
  { path: config.ShopSeller.VerifiedEmail, components: VerifiedEmailSeller, breadcrumbName: '' },
  { path: config.ShopSeller.Home, components: HomeSeller, breadcrumbName: '' },
  { path: config.ShopSeller.LinkResetPass, components: LinkResetPassSeller, breadcrumbName: '' },
  { path: config.ShopSeller.ResetPass, components: ResetPassSeller, breadcrumbName: '' },
  { path: config.ShopSeller.RegisterShop, components: RegisterShopSeller, breadcrumbName: '' },
];

export { LifeShopRoutes, AdminRoutes, ShopSellerRoutes };
