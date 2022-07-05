import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteEntity } from '@vue-design/shared/entities';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { SiteTcpController } from './site.tcp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SiteEntity])],
  controllers: [SiteController, SiteTcpController],
  providers: [SiteService],
  exports: [SiteService],
})
export class SiteModule {}
