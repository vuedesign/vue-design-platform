import { Controller } from '@nestjs/common';
import { SiteService } from './site.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { IPaginationOptions } from '@/globals/services/base.service';
import { SiteEntity } from '@/entities/site.entity';

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
}
