import { Document, DocumentDefinition, Model, Schema, SchemaDefinition, SchemaOptions } from 'mongoose';

export default function createSchema<
  DocType extends Document = Document,
  M extends Model<DocType, any> = Model<any, any>,
  SchemaDefinitionType = undefined
>(definition?: SchemaDefinition<DocumentDefinition<SchemaDefinitionType>>, options?: SchemaOptions) {
  return new Schema<DocType, M>(definition, {
    versionKey: false,
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },

    ...options,
    toJSON: {
      ...options?.toJSON,
      transform(_, ret, opts) {
        ret.id = ret._id;
        delete ret._id;
        options?.toJSON?.transform?.(_, ret, opts) ?? ret;
        return ret;
      },
    },
  });
}
