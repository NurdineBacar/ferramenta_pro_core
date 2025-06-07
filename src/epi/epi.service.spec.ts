import { Test, TestingModule } from '@nestjs/testing';
import { EpiService } from './epi.service';

describe('EpiService', () => {
  let service: EpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpiService],
    }).compile();

    service = module.get<EpiService>(EpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
