import { Test, TestingModule } from '@nestjs/testing';
import { CountController } from './count.controller';
import { CountService } from './count.service';

describe('CountController', () => {
  let controller: CountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountController],
      providers: [CountService],
    }).compile();

    controller = module.get<CountController>(CountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
