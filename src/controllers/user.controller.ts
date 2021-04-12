import Boom from '@hapi/boom';
import { Context, Next } from 'koa';
import { Types } from 'mongoose';
import UserModel from '../models/user.model';

export default class UserController {
  async getUserInfo(ctx: Context, next: Next) {
    const userId = ctx.params.id;

    if (!Types.ObjectId.isValid(userId) && userId !== 'me') {
      throw Boom.badRequest('Invalid user ID');
    }

    await next();
    if (userId === 'me' || userId === ctx.state.user.id) {
      // 需要 jwt 的请求
      // 会通过 jwt 的 id 从 mongoDB 中获取用户信息放在 state 上
      ctx.body = ctx.state.user;
      return;
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw Boom.notFound();
    }

    const userInfo = user.toJSON();

    delete userInfo.email;
    ctx.body = userInfo;
  }
}
