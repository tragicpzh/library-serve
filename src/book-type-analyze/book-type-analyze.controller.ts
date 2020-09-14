import { Controller, Post } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { bookTypeAnalyze } from './book-type-analyze.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Controller('book-type-analyze')
export class BookTypeAnalyzeController {
  constructor(
    @InjectModel(bookTypeAnalyze)
    private readonly bookTypeAnalyzeModel: ModelType<bookTypeAnalyze>,
  ) {}
  @Post('create')
  async createAnalyze() {
    const dayArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const typeArr = ['教科书', '小说', '散文', '杂志'];
    let data = [];
    for (let i = 0; i < 4; i++) {
      data.push({
        type: typeArr[i],
        data: dayArr.map((item, index) => {
          return {
            day: dayArr[dayArr.length - 1 - index],
            value: Math.floor(Math.random() * 500),
          };
        }),
      });
    }
    await this.bookTypeAnalyzeModel.create({ data });
    data = await this.bookTypeAnalyzeModel.find();
    return {
      success: true,
      data: {
        types: typeArr,
        list: data[data.length - 1],
      },
    };
  }
  @Post()
  async getAnalyze() {
    const dayArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const data = await this.bookTypeAnalyzeModel.find();
    return {
      success: true,
      data: {
        types: dayArr,
        list: data[data.length - 1],
      },
    };
  }
}
