import { Configuration } from 'log4js';

export default {
  port: +(process.env.PORT || 8081),

  databaseUrl: 'mongodb://localhost:27017/node',

  jwtSecret: process.env.JWT_NODE_SECRET || '---',

  authorizationKey: 'Authorization',

  log4js: {
    appenders: {
      console: { type: 'console' },
      access: {
        type: 'dateFile',
        filename: 'logs/access/access',
        pattern: '-dd--hh.log',
        alwaysIncludePattern: true,
      },

      system: {
        type: 'dateFile',
        filename: 'logs/system/system',
        pattern: '-dd.log',
        alwaysIncludePattern: true,
      },

      database: {
        type: 'dateFile',
        filename: 'logs/database/database',
        pattern: '-dd.log',
        alwaysIncludePattern: true,
      },
    },
    categories: {
      default: {
        appenders: ['console', 'access'],
        level: 'all',
      },
      system: {
        appenders: ['system'],
        level: 'all',
      },
      database: {
        appenders: ['database'],
        level: 'all',
      },
    },
  } as Configuration,
};
