import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { EchartsModule } from './echarts/echarts.module';
import { BookTypeAnalyzeController } from './book-type-analyze/book-type-analyze.controller';
import { BookTypeAnalyzeModule } from './book-type-analyze/book-type-analyze.module';
import { LogModule } from './log/log.module';
import { BooksModule } from './books/books.module';
import { RoomModule } from './room/room.module';
import { RecommendModule } from './recommend/recommend.module';
import { TodoModule } from './todo/todo.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/book-library', {
      useNewUrlParser: true,
    }),
    UserModule,
    EchartsModule,
    BookTypeAnalyzeModule,
    LogModule,
    BooksModule,
    RoomModule,
    RecommendModule,
    TodoModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
