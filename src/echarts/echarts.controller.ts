import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Echart } from './echarts.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import * as moment from 'moment';
class echartInfo {
  @ApiPropertyOptional()
  @IsNotEmpty()
  start: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  end: string;
}

class createInfo {
  @ApiPropertyOptional()
  @IsNotEmpty()
  month: string;
}

@Controller('echarts')
export class EchartsController {
  constructor(
    @InjectModel(Echart) private readonly EchartModel: ModelType<Echart>,
  ) {}
  @Post('create')
  async createEcharts(@Body() params: createInfo) {
    const month = params.month;
    const borrow = Math.floor(Math.random() * 500);
    const addNew = Math.floor(Math.random() * 500);
    const back = Math.floor(Math.random() * 500);
    await this.EchartModel.create({ month, borrow, addNew, back });
    return {
      success: true,
    };
  }
  @Post()
  async getEcharts(@Body() params: echartInfo) {
    let data = await this.EchartModel.find();
    data = data.filter(
      item =>
        moment(item.month) >= moment(params.start) &&
        moment(item.month) <= moment(params.end),
    );
    return {
      success: true,
      data: {
        data,
        start: params.start,
        end: params.end,
      },
    };
  }
}
