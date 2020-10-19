import { Body, Controller, Post } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { recommendType } from './recommend.model';

class createImgInfo {
  @ApiPropertyOptional()
  @IsNotEmpty()
  height: number;
  @ApiPropertyOptional()
  @IsNotEmpty()
  src: string;
}

@Controller('recommend')
export class RecommendController {
  constructor(
    @InjectModel(recommendType)
    private readonly recommendModel: ModelType<recommendType>,
  ) {}

  @Post('getImgs')
  async getImgs() {
    const data = await this.recommendModel.find().limit(9);
    const imgs = [
      [...data.slice(0, 3)],
      [...data.slice(3, 6)],
      [...data.slice(6, 9)],
    ];
    return {
      httpCode: data ? 200 : 404,
      data: {
        imgs: imgs,
      },
    };
  }

  @Post('addImg')
  async addImg() {
    const data = await this.recommendModel
      .find()
      .skip(Math.floor(Math.random() * 3))
      .limit(1);
    return {
      httpCode: data ? 200 : 404,
      img: data ? data[0] : null,
    };
  }

  @Post('createImg')
  async createImg(@Body() params: createImgInfo) {
    const { height, src } = params;
    const data = await this.recommendModel.create({ height, src });
    return {
      httpCode: data ? 200 : 404,
    };
  }
}
