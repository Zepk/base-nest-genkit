import { Test, TestingModule } from '@nestjs/testing';
import { BunyanLoggerService } from './bunyan-logger.service';

describe('BunyanLoggerService', () => {
  let service: BunyanLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BunyanLoggerService],
    }).compile();

    service = module.get<BunyanLoggerService>(BunyanLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
