import { Body, Controller, Post } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { booksType } from './books.model';

class getTableInfo {
  @ApiPropertyOptional()
  @IsNotEmpty()
  id: string;
  @ApiPropertyOptional()
  pageNo: number;
  @ApiPropertyOptional()
  pageSize: number;
}

class booksRenewInfo {
  @ApiPropertyOptional()
  @IsNotEmpty()
  id: string;
}

class createBooksInfo {
  @ApiPropertyOptional()
  @IsNotEmpty()
  userId: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  author: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  borrowDay: number;
}

@Controller('books')
export class BooksController {
  constructor(
    @InjectModel(booksType)
    private readonly booksTypeModel: ModelType<booksType>,
  ) {}
  @Post('createBooks')
  async createBooks(@Body() params: createBooksInfo) {
    const date = new Date();
    const books = {
      userId: params.userId,
      name: params.name,
      author: params.author,
      borrowTime: date,
      backTime: date.setDate(date.getDate() + params.borrowDay),
      state: 'Borrow',
    };
    const data = await this.booksTypeModel.create({ ...books });

    return {
      httpCode: data ? 200 : 404,
    };
  }
  @Post('getBooksTable')
  async getBooksTable(@Body() params: getTableInfo) {
    const userId = params.id;
    const pageNo = params.pageNo;
    const pageSize = params.pageSize;
    const list = await this.booksTypeModel
      .find({ userId: userId })
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize);
    const total = await this.booksTypeModel.find({ userId: userId }).count();
    const now = new Date();
    const updateList = [];
    const checkedList = list.map(book => {
      if (book.backTime < now) {
        book.state = 'Back';
        updateList.push(book._id);
      }
      book.state = book.state === 'Back' ? '待归还' : '仍可使用';
      return book;
    });
    const data = await this.booksTypeModel.update(
      { _id: { $in: updateList } },
      { state: 'Back' },
    );
    return {
      httpCode: 200,
      data: {
        total: total,
        list: checkedList,
      },
    };
  }
  @Post('booksRenew')
  async booksRenew(@Body() params: booksRenewInfo) {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const data = await this.booksTypeModel.update(
      { _id: params.id },
      { backTime: date, state: 'Brrow' },
    );
    console.log(data, date);
    return {
      httpCode: data.nModified ? 200 : 404,
    };
  }
}
