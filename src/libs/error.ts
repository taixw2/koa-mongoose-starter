import Boom from '@hapi/boom';
import { Context, Next } from 'koa';

export default async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    const error = Boom.boomify(err);
    const body = { message: error.message, stack: undefined };

    if (error.data) {
      body.stack = error.data as any;
    }

    ctx.body = body;
    ctx.status = error.output.statusCode || 500;
  }
};
