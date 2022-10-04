import { Injectable } from '@nestjs/common';
import { SiteEntity } from '@/entities/site.entity';
import { FindManyOptions } from 'typeorm';
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
        return this.send({ module: 'site', method: 'findList' }, options);
    }

    findOneBy(where: Record<string, any>): Promise<SiteEntity> {
        return this.send({ module: 'site', method: 'findOneBy' }, where);
    }
}
