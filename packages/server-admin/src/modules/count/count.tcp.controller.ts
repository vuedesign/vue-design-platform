import { Controller } from '@nestjs/common';
import { CountService } from './count.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { CountEntity } from '@/entities/count.entity';

/**
 * 站点模块
 */
@Controller()
export class CountTcpController {
  constructor(private readonly countService: CountService) {}

  @MessagePattern(
    { module: 'count', method: 'findOneByAuthorId' },
    Transport.TCP,
  )
  findOneByAuthorId(authorId: number) {
    return this.countService.findOne({ authorId });
  }
}
