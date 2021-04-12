import Application from 'koa';
import * as userAPI from './api/user';

export default (app: Application) => {
  app.use(userAPI.router.routes());
};
