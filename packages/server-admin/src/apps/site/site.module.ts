import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { SiteTcpController } from './site.tcp.controller';
import { SiteEntity } from '@/entities/site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteEntity])],
  controllers: [SiteController, SiteTcpController],
  providers: [SiteService],
  exports: [SiteService],
})
export class SiteModule {}
