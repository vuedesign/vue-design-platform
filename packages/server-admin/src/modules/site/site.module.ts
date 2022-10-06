import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteEntity } from '@/entities/site.entity';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { TagEntity } from '@/entities/tag.entity';
import { TagService } from '../tag/tag.service';
import { ToolEntity } from '@/entities/tool.entity';
import { ToolService } from '@/modules/tool/tool.service';

@Module({
    imports: [TypeOrmModule.forFeature([SiteEntity, TagEntity, ToolEntity])],
    controllers: [SiteController],
    providers: [SiteService, TagService, ToolService],
    exports: [SiteService],
})
export class SiteModule {}
