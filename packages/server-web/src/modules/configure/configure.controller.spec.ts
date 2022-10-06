import { Test, TestingModule } from '@nestjs/testing';
import { ConfigureController } from './configure.controller';
import { ConfigureService } from './configure.service';

describe('ConfigureController', () => {
    let controller: ConfigureController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConfigureController],
            providers: [ConfigureService],
        }).compile();

        controller = module.get<ConfigureController>(ConfigureController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
