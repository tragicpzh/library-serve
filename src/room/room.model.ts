import { Prop } from '@typegoose/typegoose';
export class room {
  @Prop()
  name: string;
  @Prop()
  position: string;
  @Prop()
  contact: string;
  @Prop()
  state: string;
  @Prop()
  max: number;
  @Prop()
  applyArr: Array<any>;
}
