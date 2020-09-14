import { Test, TestingModule } from '@nestjs/testing';
import { BookTypeAnalyzeController } from './book-type-analyze.controller';

describe('BookTypeAnalyzeController', () => {
  let controller: BookTypeAnalyzeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookTypeAnalyzeController],
    }).compile();

    controller = module.get<BookTypeAnalyzeController>(BookTypeAnalyzeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
