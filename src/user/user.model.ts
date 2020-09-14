import { prop } from '@typegoose/typegoose';
export class User {
  @prop()
  username: string;
  @prop()
  password: string;
  @prop()
  role: string;
  @prop()
  email: string;
  @prop()
  telephone: string;
}
