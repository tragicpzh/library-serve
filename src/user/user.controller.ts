import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

class RegisterUserDto {
  @ApiPropertyOptional({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  username: string;
  @ApiPropertyOptional({ description: '用户密码' })
  @IsNotEmpty({ message: '请输入用户密码' })
  password: string;
  @ApiPropertyOptional({ description: '用户角色' })
  @IsNotEmpty({ message: '请输入用户角色' })
  role: string;
}

class LoginUserDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  username: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  password: string;
}

class userInfoDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  username: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  password: string;
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  telephone: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  id: string;
}

@Controller('user')
export class UserController {
  constructor(@InjectModel(User) private readonly UserModel: ModelType<User>) {}
  @Get()
  async getUser(@Query('id') id: string) {
    const userInfo = await this.UserModel.findById(id);
    return {
      success: userInfo ? true : false,
      data: userInfo,
    };
  }

  @Post()
  @ApiOperation({ summary: 'login-user' })
  async login(@Body() user: LoginUserDto) {
    const userInfo = await this.UserModel.findOne({
      username: user.username,
      password: user.password,
    });
    return {
      success: userInfo ? true : false,
      data: userInfo
        ? {
            username: userInfo.username,
            password: userInfo.password,
            role: userInfo.role,
            email: userInfo.email,
            telephone: userInfo.telephone,
            id: userInfo._id,
          }
        : null,
    };
  }

  @Post('/create')
  async createUser(@Body() user: RegisterUserDto) {
    const users = await this.UserModel.find({ username: user.username });
    if (users.length === 0) {
      await this.UserModel.create({ ...user, email: '', telephone: '' });
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }
  @Put('updateUserInfo')
  async updateUserInfo(@Body() userInfo: userInfoDto) {
    const data = await this.UserModel.findByIdAndUpdate(userInfo.id, {
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
      telephone: userInfo.telephone,
    });
    return {
      success: data ? true : false,
      data: data,
    };
  }
}
