const routes = {
  home: '/',
  signIn: '/login',
  register: '/register',
  logout: '/logout',
  productdetails: '/products',
  search: '/search/:title',
  cart: '/cart',
  cat: '/cat',
  //users needs to login
  profile: '/user/account/profile',
  purchaseOrder: '/user/account/purchase',
  address: '/user/account/address',
  changePassword: '/user/account/change_password',
  bank: '/user/account/bank',
  notification: '/user/account/notification',
  voucher: '/user/account/voucher',
};

export default routes;
