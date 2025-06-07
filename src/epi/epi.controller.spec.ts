import { Test, TestingModule } from '@nestjs/testing';
import { EpiController } from './epi.controller';

describe('EpiController', () => {
  let controller: EpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpiController],
    }).compile();

    controller = module.get<EpiController>(EpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
