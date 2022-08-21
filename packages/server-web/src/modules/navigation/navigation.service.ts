import { Injectable } from '@nestjs/common';
import { NavigationEntity } from '@/entities/navigation.entity';
import {
  IPaginationOptions,
  IPaginationResponse,
} from '@/globals/services/base.service';
import { BaseMicroservice } from '@/globals/services/base.microservice';

@Injectable()
export class NavigationService extends BaseMicroservice {
  findList(
    options: IPaginationOptions,
  ): Promise<IPaginationResponse<NavigationEntity>> {
    console.log('options', options);
    return this.send({ module: 'navigation', method: 'find' }, options);
  }
}
