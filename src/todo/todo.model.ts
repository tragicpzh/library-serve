import { Prop } from '@typegoose/typegoose';
export class todo {
  @Prop()
  userId: string;
  @Prop()
  name: string;
  @Prop()
  todo: string;
  @Prop()
  to: number;
  @Prop()
  color: string;
}
