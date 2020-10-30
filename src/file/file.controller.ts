import { index } from '@hasezoey/typegoose';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { rmdirSync, existsSync, readdirSync, unlinkSync } from 'fs';
import { mkdirs, createReadStream, createWriteStream } from 'fs-extra';
import { join } from 'path';

class Merge {
  @ApiPropertyOptional()
  @IsNotEmpty()
  size: number;
  @ApiPropertyOptional()
  @IsNotEmpty()
  count: number;
  @ApiPropertyOptional()
  @IsNotEmpty()
  fileName: string;
}

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('chunk'))
  async upload(@UploadedFile() file, @Body() body) {
    const { fileName, hash, count } = body;
    const Path = join('D:\\workspace\\BigFile', 'target', fileName);
    if (!existsSync(Path)) {
      await mkdirs(Path);
    }
    const writeStream = createWriteStream(`${Path}/${hash}`);
    writeStream.on('error', err => {
      console.log('upload:', err);
    });
    writeStream.write(file.buffer);
    writeStream.end();
  }

  @Post('merge')
  async merge(@Body() body: Merge) {
    const { count, fileName, size } = body;
    const Path = join('D:\\workspace\\BigFile', 'target', fileName);
    const DestDir = join('D:\\workspace\\BigFile', 'merge');
    let Paths = [];
    if (!existsSync(Path)) {
      return {
        httpCode: 200,
        error: '切片文件夹不存在',
      };
    }
    Paths = readdirSync(Path);
    if (Paths.length < count) {
      console.log(Paths.length);
      return {
        httpCode: 200,
        error: '未接收到全部文件',
      };
    }
    if (!existsSync(DestDir)) {
      await mkdirs(DestDir);
    }
    Paths.sort((a, b) => {
      const A = a.split('-');
      const B = b.split('-');
      const indexA = Number(A[A.length - 1]);
      const indexB = Number(B[B.length - 1]);
      return indexA - indexB;
    });
    await Promise.all(
      Paths.map(
        (path, index) =>
          new Promise(resolve => {
            const Dest = join(DestDir, fileName);
            const Source = join(Path, path);
            const writeStream = createWriteStream(Dest, {
              start: index * size,
            });
            const readStream = createReadStream(Source);
            readStream.on('end', () => {
              unlinkSync(Source);
              resolve();
            });
            readStream.pipe(writeStream);
          }),
      ),
    );
    rmdirSync(Path);
    return {
      httpCode: 200,
      success: 'merge complete',
    };
  }
}
