const routes = {
  home: '/',
  signIn: '/login',
  register: '/register',
  logout: '/logout',
  productdetails: '/products/:title/:id',
  search: '/search/:title',
  cart: '/cart',
  cat: '/cat',
  404: '*',

  // users needs to login
  profile: '/user/account/profile',
  purchaseOrder: '/user/account/purchase',
  address: '/user/account/address',
  changePassword: '/user/account/change_password',
  bank: '/user/account/bank',
  notification: '/user/account/notification',
  voucher: '/user/account/voucher',
  userbank: '/user/account/bank',
};

export const adminRoutes = {
  Logo: '/admin/logo',
  AddLogo: '/admin/add-logo',
  SignIn: '/admin/login',
  ResetPassword: '/admin/reset-pass',
  Home: '/admin',
  ProfileAdmin: '/admin/profile',
  ChangePassword: '/admin/change-password',
  AllAdmin: '/admin/admin',
  EditAdmin: '/admin/edit-admin/:id',
  AddAdmin: '/admin/add-admin',
  AllUser: '/admin/user',
  EditUser: '/admin/edit-user/:id',
  AllShop: '/admin/shop',
  EditShop: '/admin/edit-shop/:id',
  Location: '/admin/location',
  Category: '/admin/category',
  Blogs: '/admin/blogs',
  EditBlogs: '/admin/edit-blogs/:id',
  AddBlogs: '/admin/add-blogs',
  Department: '/admin/department',
  OrderProduct: '/admin/order',
  AllProduct: '/admin/product',
  EditProduct: '/admin/edit-product/:id',
  ReportProduct: '/admin/report-product',
  Voucher: '/admin/voucher',
  AddVoucher: '/admin/add-voucher',
  EditVoucher: '/admin/edit-voucher/:id',
  Manufacturer: '/admin/manufacturer',
  AddManufacturer: '/admin/add-manufacturer',
  EditManufacturer: '/admin/edit-manufacturer/:id',
  Role: '/admin/role',
};

export const ShopSeller = {
  SignUp: '/seller/register',
  SignIn: '/seller/login',
  LinkResetPass: '/seller/password/reset-password',
  ResetPass: '/seller/password/reset',
  ChangePassword: '/seller/change-password',
  Home: '/seller',
  VerifiedEmail: '/seller/verify-email',
  RegisterShop: '/seller/portal',
};

export default routes;
