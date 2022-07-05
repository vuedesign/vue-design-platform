import { Injectable } from '@nestjs/common';
import { SiteEntity } from '@vue-design/shared/entities';
import { IPaginationOptions } from '@/globals/services/base.service';
import { BaseMicroservice } from '@/globals/services/base.microservice';

@Injectable()
export class SiteService extends BaseMicroservice {
  findList(options: IPaginationOptions): Promise<SiteEntity[]> {
    return this.send({ module: 'site', method: 'find' }, options);
  }
}
