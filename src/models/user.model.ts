import createSchema from './../utils/model';
import { Document, model, Model } from 'mongoose';
import bcryptjs from 'bcryptjs';

interface User {
  // public user
  email?: string;
  password: string;
  name: string;
}

interface UserDocument extends User, Document {
  verifyPwd(password: string): Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {
  findByEmail(email: string): Promise<UserDocument>;
}

const UserSchema = createSchema<UserDocument, Model<UserDocument>>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        delete ret.password;
      },
    },
  }
);

UserSchema.pre<UserDocument>('save', async function () {
  this.password = await bcryptjs.hash(this.password, 10);
});

UserSchema.methods.verifyPwd = async function (this: UserDocument, password: string) {
  return bcryptjs.compare(password, this.password);
};

UserSchema.statics.findByEmail = async function (this: Model<UserDocument>, email: string) {
  return this.findOne({ email });
};

export default model<UserDocument, UserModel>('User', UserSchema);
