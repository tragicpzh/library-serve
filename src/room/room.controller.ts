import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator';
import { count } from 'console';
import { InjectModel } from 'nestjs-typegoose';
import { room } from './room.model';

class createRoomInfo {
  @ApiPropertyOptional()
  @IsNotEmpty()
  max: number;
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  position: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  contact: string;
}

@Controller('room')
export class RoomController {
  constructor(
    @InjectModel(room)
    private readonly roomModel: ModelType<room>,
  ) {}
  @Post('createRooms')
  async createRoom(@Body() params: createRoomInfo) {
    const room: room = {
      name: params.name,
      position: params.position,
      contact: params.contact,
      state: params.max > 0 ? '空闲' : '满人',
      max: params.max,
      applyArr: [],
    };
    const data = await this.roomModel.create({ ...room });
    console.log(data);
    return {
      httpCode: data ? 200 : 404,
    };
  }
  @Post('getRooms')
  async getRooms(@Body() params: any) {
    const { userId, pageNo, pageSize } = params;
    const data = await this.roomModel
      .find()
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize);

    const total = await this.roomModel.find().count();
    const list = data.map((room: room) => {
      if (room.applyArr.includes(userId)) {
        room.state = '已预约';
      }
      return room;
    });
    return {
      httpCode: 200,
      data: {
        list,
        total,
      },
    };
  }
  @Post('updateRoom')
  async updateRoom(@Body() params: any) {
    const { id, userId, type } = params;
    const room = await this.roomModel.findOne({ _id: id });
    const applyArr = room.applyArr;
    const state =
      applyArr.length + (type === 'apply' ? 1 : -1) < room.max
        ? '空闲'
        : '满人';
    const data = await this.roomModel.update(
      { _id: id },
      type === 'apply'
        ? { $addToSet: { applyArr: userId }, state }
        : { $pull: { applyArr: userId }, state },
    );

    return {
      httpCode: data.nModified ? 200 : 404,
    };
  }
}
