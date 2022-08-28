import { Test, TestingModule } from '@nestjs/testing';
import { CountService } from './count.service';

describe('CountService', () => {
  let service: CountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountService],
    }).compile();

    service = module.get<CountService>(CountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
