import Boom from '@hapi/boom';
import { ObjectSchema } from 'joi';
import { Context, Next } from 'koa';

export interface ValidateSchame {
  headers?: ObjectSchema;
  query?: ObjectSchema;
  body?: ObjectSchema;
  params?: ObjectSchema;
}

function validate(schame: ValidateSchame, ctx: Context) {
  Object.keys(schame).forEach((key) => {
    const modal = schame[key as keyof ValidateSchame];
    const value = key === 'body' ? ctx.request.body : ctx[key];
    const result = modal?.validate(value);

    if (result?.error) {
      throw Boom.badRequest(`Invalid ${key} - ${result.error.message}`);
    }
  });
}

export const useValidate = (schame: ValidateSchame) => async (ctx: Context, next: Next) => {
  validate(schame, ctx);
  await next();
};

export default (schame: ValidateSchame) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function (ctx: Context, next: Next) {
    validate(schame, ctx);
    await originalMethod.call(this, ctx, next);
  };
};
