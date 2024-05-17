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
  EditAdmin: '/admin/edit-admin',
  AllShop: '/admin/all-shop',
  EditShop: '/admin/edit-shop',
  Location: '/admin/location',
};

export default routes;
