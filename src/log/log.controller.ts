import { Controller, Post, Body, Param, Query, Req, Res } from '@nestjs/common';
import { Request } from 'express';

@Controller('log')
export class LogController {
  @Post()
  getLogs(@Req() req) {
    req.on('data', reqs => {
      console.log(JSON.parse(reqs.toString()));
    });
    return {
      success: true,
    };
  }
}
