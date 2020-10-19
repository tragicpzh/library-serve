import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BooksController } from './books.controller';
import { booksType } from './books.model';

@Module({
  imports: [TypegooseModule.forFeature([booksType])],
  controllers: [BooksController],
})
export class BooksModule {}
