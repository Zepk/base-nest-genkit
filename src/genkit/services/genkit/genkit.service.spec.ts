import { Test, TestingModule } from '@nestjs/testing';
import { GenkitService } from './genkit.service';

describe('GenkitService', () => {
  let service: GenkitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenkitService],
    }).compile();

    service = module.get<GenkitService>(GenkitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
