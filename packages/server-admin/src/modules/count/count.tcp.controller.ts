import { Controller } from '@nestjs/common';
import { CountService } from './site.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { CountEntity } from '@/entities/site.entity';

/**
 * 站点模块
 */
@Controller()
export class CountTcpController {
  constructor(private readonly siteService: CountService) {}

  @MessagePattern(
    { module: 'count', method: 'findOneByAuthorId' },
    Transport.TCP,
  )
  findOneByAuthorId(authorId: Number) {
    return this.siteService.findOne({ authorId });
  }
}
