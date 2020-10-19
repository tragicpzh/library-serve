import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { todo } from './todo.model';

class getTodosInfo {
  @ApiPropertyOptional()
  @IsNotEmpty()
  userId: string;
}

class createTodosInfo {
  @ApiPropertyOptional()
  @IsNotEmpty()
  userId: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  todo: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  color: 'green' | 'yeloow' | 'red';
  @ApiPropertyOptional()
  @IsNotEmpty()
  to: number;
}

@Controller('todo')
export class TodoController {
  constructor(
    @InjectModel(todo)
    private readonly todoModel: ModelType<todo>,
  ) {}
  @Post('getTodos')
  async getTodos(@Body() params: getTodosInfo) {
    const { userId } = params;
    const data = await this.todoModel.find({ userId });
    return {
      httpCode: 200,
      data: {
        list: data,
      },
    };
  }
  @Post('createTodos')
  async createTodos(@Body() parmas: createTodosInfo) {
    const data = await this.todoModel.create({ ...parmas });
    return {
      httpCode: data ? 200 : 404,
    };
  }
}
