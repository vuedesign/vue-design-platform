import { Controller } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { IPaginationOptions } from '@/globals/services/base.service';

/**
 * 导航模块
 */
@Controller()
export class NavigationTcpController {
  constructor(private readonly navigationService: NavigationService) {}
  /**
   * 导航列表
   */
  @MessagePattern({ module: 'navigation', method: 'find' }, Transport.TCP)
  findAll(options: IPaginationOptions) {
    console.log('tcp server', options);
    return this.navigationService.findAll(options);
  }
}
