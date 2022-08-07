import { Injectable } from '@nestjs/common';
import { SiteEntity } from '@/entities/site.entity';
import { IPaginationOptions } from '@/globals/services/base.service';
import { BaseMicroservice } from '@/globals/services/base.microservice';
import { IPaginatedType } from '@/dtos/paginated.gql';

@Injectable()
export class SiteService extends BaseMicroservice {
  findList(options: IPaginationOptions): Promise<IPaginatedType<SiteEntity>> {
    return this.send({ module: 'site', method: 'find' }, options);
  }
}
