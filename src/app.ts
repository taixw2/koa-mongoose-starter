import Koa from 'koa';
import bodyParser from 'koa-body';
import mongoose from 'mongoose';
import passport from 'koa-passport';

import config from './config';
import { useLogger } from './libs/logger';
import error from './libs/error';
import { ExtractJwt, Strategy } from 'passport-jwt';
// Must be import before the ./router
import './libs/mongoose.lib';
import router from './router';
import UserModel from './models/user.model';

mongoose
  .connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = new Koa();

    app.use(bodyParser());

    app.use(useLogger());

    app.use(error);

    const strategyOptions = {
      secretOrKey: config.jwtSecret,
      jwtFromRequest: ExtractJwt.fromHeader(config.authorizationKey),
    };

    passport.use(
      new Strategy(strategyOptions, ({ id }, done) =>
        UserModel.findById(id)
          .then((user) => done(null, user))
          .catch((error) => done(error))
      )
    );
    app.use(passport.initialize());

    router(app);

    app.listen(config.port);
    console.log(`Server running on port:`, config.port);
  })
  .catch((error: string) => console.log('MongoDB connection error:', error));
