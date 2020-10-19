import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RoomController } from './room.controller';
import { room } from './room.model';

@Module({
  imports: [TypegooseModule.forFeature([room])],
  controllers: [RoomController],
})
export class RoomModule {}
