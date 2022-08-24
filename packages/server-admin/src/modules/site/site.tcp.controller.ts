import { Controller } from '@nestjs/common';
import { SiteService } from './site.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { IPaginationOptions } from '@/globals/services/base.service';
import { SiteEntity } from '@/entities/site.entity';
import { FindManyOptions } from 'typeorm';

/**
 * 站点模块
 */
@Controller()
export class SiteTcpController {
  constructor(private readonly siteService: SiteService) {}
  /**
   * 站点列表
   */
  @MessagePattern({ module: 'site', method: 'find' }, Transport.TCP)
  findAll(options: IPaginationOptions<SiteEntity>) {
    return this.siteService.findList(options);
  }

  @MessagePattern({ module: 'site', method: 'findOneByUuid' }, Transport.TCP)
  findOneByUuid(uuid: string) {
    return this.siteService.findOneBy({ uuid });
  }

  @MessagePattern({ module: 'site', method: 'count' }, Transport.TCP)
  count(options?: FindManyOptions<SiteEntity>) {
    return this.siteService.count(options);
  }
}
