import { Prop, prop } from '@typegoose/typegoose';
export class Echart {
  @prop()
  month: string;
  @prop()
  borrow: number;
  @Prop()
  addNew: number;
  @Prop()
  back: number;
}
