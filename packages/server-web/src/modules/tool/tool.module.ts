import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from '@/entities/tool.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ToolEntity])],
    controllers: [ToolController],
    providers: [ToolService],
})
export class ToolModule {}
