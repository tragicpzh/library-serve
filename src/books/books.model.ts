import { Prop } from '@typegoose/typegoose';
export class booksType {
  @Prop()
  userId: string;
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  author: string;
  @Prop()
  borrowTime: Date;
  @Prop()
  backTime: Date;
  @Prop()
  state: string;
}
