import { Module } from '@nestjs/common';
import { EchartsController } from './echarts.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Echart } from './echarts.model';

@Module({
  imports: [TypegooseModule.forFeature([Echart])],
  controllers: [EchartsController],
})
export class EchartsModule {}
