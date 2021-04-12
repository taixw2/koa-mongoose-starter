import passport from 'koa-passport';
import Router from '@koa/router';
import { Context, DefaultState } from 'koa';
import { user } from '../controllers';

const router = new Router<DefaultState, Context>({
  prefix: '/api/users',
});

router.use(passport.authenticate('jwt', { session: false }));
router.get('/:id', user.getUserInfo);

export { router };
