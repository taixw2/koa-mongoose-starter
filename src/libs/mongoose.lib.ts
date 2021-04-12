import Boom from '@hapi/boom';
import mongoose, { CallbackError, NativeError } from 'mongoose';
import logger from './logger';

/**
 * Global Plugin
 */
mongoose.plugin((schema) => {
  const handleError = (error: NativeError, doc: any, next: any) => {
    logger.database.error(error);
    return next(Boom.badImplementation());
  };

  schema.post(/^find/, handleError);
  // ... other error
});
