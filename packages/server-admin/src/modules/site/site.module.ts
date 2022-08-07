import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteEntity } from '@/entities/site.entity';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { SiteTcpController } from './site.tcp.controller';
import { TagService } from '../tag/tag.service';
import { TagEntity } from '@/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteEntity, TagEntity])],
  controllers: [SiteController, SiteTcpController],
  providers: [SiteService, TagService],
  exports: [SiteService],
})
export class SiteModule {}
