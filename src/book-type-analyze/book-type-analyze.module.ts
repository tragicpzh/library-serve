import { Module } from '@nestjs/common';
import { BookTypeAnalyzeController } from './book-type-analyze.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { bookTypeAnalyze } from './book-type-analyze.model';

@Module({
  imports: [TypegooseModule.forFeature([bookTypeAnalyze])],
  controllers: [BookTypeAnalyzeController],
})
export class BookTypeAnalyzeModule {}
