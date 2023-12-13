import HomePages from '~/Pages/Home';
import config from '~/config';

const publicRoutes = [{ path: config.routes.home, components: HomePages }];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
