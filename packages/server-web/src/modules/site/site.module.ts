import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { SiteResolver } from './site.resolver';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';

@Module({
  imports: [BaseMicroserviceModule],
  controllers: [SiteController],
  providers: [SiteResolver, SiteService],
  exports: [SiteService],
})
export class SiteModule {}
