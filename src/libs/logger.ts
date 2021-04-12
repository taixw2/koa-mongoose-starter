import { Context, Next } from 'koa';
import log4js from 'log4js';
import config from '../config';

log4js.configure(config.log4js);

export const system = () => log4js.getLogger('system');

export const database = () => log4js.getLogger('database');

export const useLogger = () => {
  const connectLogger = log4js.connectLogger(log4js.getLogger('access'), { level: 'auto' });
  return async (ctx: Context, next: Next) => {
    // Mock express
    connectLogger(ctx.req, ctx.res, () => {});
    await next();
  };
};

export default {
  get system() {
    return log4js.getLogger('system');
  },

  get database() {
    return log4js.getLogger('database');
  },
};
