import { Prop } from '@typegoose/typegoose';
interface bookAnalyze {
  type: string;
  data: any[];
}
export class bookTypeAnalyze {
  @Prop()
  data: bookAnalyze[];
}
