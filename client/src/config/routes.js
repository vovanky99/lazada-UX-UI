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
  SignIn: '/admin/login',
  ResetPassword: '/admin/resetpass',
  Home: '/admin',
  ProfileAdmin: '/admin/profile',
  AllAdmin: '/admin/all-admin',
  EditAdmin: '/admin/edit-admin/:id',
  AddAdmin: '/admin/add-admin',
  AllUser: '/admin/all-user',
  EditUser: '/admin/edit-user/:id',
  AddUser: '/admin/add-user',
  AllShop: '/admin/all-shop',
  EditShop: '/admin/edit-shop',
  Location: '/admin/location',
  Category: '/admin/category',
  Blogs: '/admin/blogs',
  Department: '/admin/department',
  Order: '/admin/order',
  Product: '/admin/product',
  EditProduct: '/admin/edit-product/:name-:id',
  ReportProduct: '/admin/report-product',
  Voucher: '/admin/voucher',
  Manufacturer: '/admin/manufacturer',
};

export default routes;
