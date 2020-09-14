import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { EchartsModule } from './echarts/echarts.module';
import { BookTypeAnalyzeController } from './book-type-analyze/book-type-analyze.controller';
import { BookTypeAnalyzeModule } from './book-type-analyze/book-type-analyze.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/book-library', {
      useNewUrlParser: true,
    }),
    UserModule,
    EchartsModule,
    BookTypeAnalyzeModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
