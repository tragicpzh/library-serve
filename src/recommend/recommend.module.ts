import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RecommendController } from './recommend.controller';
import { recommendType } from './recommend.model';

@Module({
  imports: [TypegooseModule.forFeature([recommendType])],
  controllers: [RecommendController],
})
export class RecommendModule {}
