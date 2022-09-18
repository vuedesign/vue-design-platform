import { Test, TestingModule } from '@nestjs/testing';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';

describe('ToolController', () => {
    let controller: ToolController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ToolController],
            providers: [ToolService],
        }).compile();

        controller = module.get<ToolController>(ToolController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
