import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteEntity } from '@/entities/site.entity';
import { TagEntity } from '@/entities/tag.entity';
import { ToolEntity } from '@/entities/tool.entity';
import { SiteService } from './site.service';
import { TagService } from '../tag/tag.service';
import { ToolService } from '@/modules/tool/tool.service';

@Module({
    imports: [TypeOrmModule.forFeature([SiteEntity, TagEntity, ToolEntity])],
    controllers: [SiteController],
    providers: [SiteService, TagService, ToolService],
    exports: [SiteService],
})
export class SiteModule {}
