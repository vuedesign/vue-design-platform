import { Injectable } from '@nestjs/common';
import { SiteEntity } from '@/entities/site.entity';
import { IPaginationOptions } from '@/globals/services/base.service';
import { BaseMicroservice } from '@/globals/services/base.microservice';

interface FindList {
  list: [SiteEntity];
  pagination: {
    page: number;
    size: number;
  };
  total: number;
}

@Injectable()
export class SiteService extends BaseMicroservice {
  findList(options: IPaginationOptions): Promise<FindList> {
    console.log('==s=', options);
    return this.send({ module: 'site', method: 'find' }, options);
  }
}
