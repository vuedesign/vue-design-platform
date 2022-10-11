import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from '@/entities/tool.entity';
import { SiteEntity } from '@/entities/site.entity';
import { SiteService } from '@/modules/site/site.service';

@Module({
    imports: [TypeOrmModule.forFeature([ToolEntity, SiteEntity])],
    controllers: [ToolController],
    providers: [ToolService, SiteService],
    exports: [ToolService],
})
export class ToolModule {}
