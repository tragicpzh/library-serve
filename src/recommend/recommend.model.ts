import { from } from 'rxjs';
import { Prop } from '@typegoose/typegoose';
export class recommendType {
  @Prop()
  height: number;
  @Prop()
  src: string;
}
