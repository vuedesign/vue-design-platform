import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';

@Module({
    imports: [BaseMicroserviceModule],
    controllers: [ToolController],
    providers: [ToolService],
})
export class ToolModule {}
