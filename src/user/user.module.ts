import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
