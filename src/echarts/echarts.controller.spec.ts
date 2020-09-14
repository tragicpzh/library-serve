import { Test, TestingModule } from '@nestjs/testing';
import { EchartsController } from './echarts.controller';

describe('EchartsController', () => {
  let controller: EchartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EchartsController],
    }).compile();

    controller = module.get<EchartsController>(EchartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
