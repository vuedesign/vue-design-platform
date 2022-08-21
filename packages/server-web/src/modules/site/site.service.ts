import { Injectable } from '@nestjs/common';
import { SiteEntity } from '@/entities/site.entity';
import {
  IPaginationOptions,
  IPaginationResponse,
} from '@/globals/services/base.service';
import { BaseMicroservice } from '@/globals/services/base.microservice';

@Injectable()
export class SiteService extends BaseMicroservice {
  findList(
    options: IPaginationOptions,
  ): Promise<IPaginationResponse<SiteEntity>> {
    return this.send({ module: 'site', method: 'find' }, options);
  }

  findOneByUuid(uuid: string) {
    return this.send({ module: 'site', method: 'findOneByUuid' }, uuid);
  }
}
