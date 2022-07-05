import { Injectable } from '@nestjs/common';
import { NavigationEntity } from '@vue-design/shared/entities';
import { IPaginationOptions } from '@/globals/services/base.service';
import { BaseMicroservice } from '@/globals/services/base.microservice';

@Injectable()
export class NavigationService extends BaseMicroservice {
  findList(options: IPaginationOptions): Promise<NavigationEntity[]> {
    return this.send({ module: 'navigation', method: 'find' }, options);
  }
}
