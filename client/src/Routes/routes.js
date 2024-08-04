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
import SellerAddProducts from '~/pages/Seller/Products/AddProducts';
import Attributes from '~/pages/ADMIN/Attributes';
import AttributesProducts from '~/pages/ADMIN/AttributesProducts';

const LifeShopRoutes = [
  { path: config.routes.home, components: HomePages, MainLayout: true },
  { path: config.routes.signIn, components: SignIn, MainLayout: false },
  { path: config.routes.register, components: Register, MainLayout: false },
  { path: config.routes.productdetails, components: ProductDetails, MainLayout: true },
  { path: config.routes.cat, components: Cat, MainLayout: true },
  { path: config.routes.search, components: Search, MainLayout: true },
  { path: config.routes.cart, components: Cart, MainLayout: true },
  { path: config.routes.profile, components: Profile, MainLayout: true },
  { path: config.routes.address, components: Address, MainLayout: true },
  { path: config.routes.purchaseOrder, components: Order, MainLayout: true },
  { path: config.routes.userbank, components: UserBank, MainLayout: true },
  { path: config.routes[404], components: Error, MainLayout: true },
];

const AdminRoutes = [
  { path: config.adminRoutes.SignIn, components: AdminLogin, MainLayout: false },
  {
    path: config.adminRoutes.Home,
    components: AdminHome,
    breadcrumbName: 'DashBoard',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.AllAdmin,
    components: AllAdmin,
    breadcrumbName: 'All Admin',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.EditAdmin,
    components: EditAdmin,
    breadcrumbName: 'Edit Admin',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.AddAdmin,
    components: AddAdmin,
    breadcrumbName: 'Add Admin',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.AllShop,
    components: AllShop,
    breadcrumbName: 'All Shop',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.EditShop,
    components: EditShop,
    breadcrumbName: 'Edit Shop',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.ProfileAdmin,
    components: ProfileAdmin,
    breadcrumbName: 'Profile',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.Location,
    components: LocationAdmin,
    breadcrumbName: 'Location',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.Category,
    components: Category,
    breadcrumbName: 'Category',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.AllUser,
    components: AllUser,
    breadcrumbName: 'All User',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.EditUser,
    components: EditUser,
    breadcrumbName: 'Edit User',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.Role,
    components: Role,
    breadcrumbName: 'Role',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.Voucher,
    components: Voucher,
    breadcrumbName: 'Voucher',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.AddVoucher,
    components: AddVoucher,
    breadcrumbName: 'Add Voucher',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.EditVoucher,
    components: EditVoucher,
    breadcrumbName: 'Edit Voucher',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.Blogs,
    components: Blog,
    breadcrumbName: 'Blog',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.EditBlogs,
    components: EditBlog,
    breadcrumbName: 'Edit Blog',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.AddBlogs,
    components: AddBlog,
    breadcrumbName: 'Add Blog',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.Department,
    components: Department,
    breadcrumbName: 'Department',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.Manufacturer,
    components: Manufacturer,
    breadcrumbName: 'Manufacturer',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.AddManufacturer,
    components: AddManu,
    breadcrumbName: 'Add Manufacturer',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.EditManufacturer,
    components: EditManu,
    breadcrumbName: 'Edit Manufacturer',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.ReportProduct,
    components: ReportProduct,
    breadcrumbName: 'Report Product',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.OrderProduct,
    components: OrderProduct,
    breadcrumbName: 'Order',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.Logo,
    components: Logo,
    breadcrumbName: 'Logo',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.AddLogo,
    components: AddLogo,
    breadcrumbName: 'Add Logo',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.AllProduct,
    components: AllProduct,
    breadcrumbName: 'All Product',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.EditProduct,
    components: EditProduct,
    breadcrumbName: 'Edit Product',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.ChangePassword,
    components: ChangePassword,
    breadcrumbName: '',
    MainLayout: false,
  },
  {
    path: config.adminRoutes.ResetPassword,
    components: ResetPass,
    breadcrumbName: '',
    MainLayout: false,
  },
  {
    path: config.adminRoutes.Attributes,
    components: Attributes,
    breadcrumbName: 'atributes',
    MainLayout: true,
  },
  {
    path: config.adminRoutes.Attributes_product,
    components: AttributesProducts,
    breadcrumbName: 'atributes products',
    MainLayout: true,
  },
];

const ShopSellerRoutes = [
  { path: config.ShopSeller.SignUp, components: SignUpSeller, breadcrumbName: '', MainLayout: 0 },
  { path: config.ShopSeller.SignIn, components: SignInSeller, breadcrumbName: '', MainLayout: 0 },
  { path: config.ShopSeller.VerifiedEmail, components: VerifiedEmailSeller, breadcrumbName: '', MainLayout: 0 },
  { path: config.ShopSeller.Home, components: HomeSeller, breadcrumbName: '', MainLayout: 1 },
  { path: config.ShopSeller.LinkResetPass, components: LinkResetPassSeller, breadcrumbName: '', MainLayout: 0 },
  { path: config.ShopSeller.ResetPass, components: ResetPassSeller, breadcrumbName: '', MainLayout: 0 },
  { path: config.ShopSeller.RegisterShop, components: RegisterShopSeller, breadcrumbName: '', MainLayout: 0 },
  { path: config.ShopSeller.NewProduct, components: SellerAddProducts, breadcrumbName: '', MainLayout: 2 },
];

export { LifeShopRoutes, AdminRoutes, ShopSellerRoutes };
