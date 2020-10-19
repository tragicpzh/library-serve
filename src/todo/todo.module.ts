import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TodoController } from './todo.controller';
import { todo } from '../todo/todo.model';

@Module({
  imports: [TypegooseModule.forFeature([todo])],
  controllers: [TodoController],
})
export class TodoModule {}
