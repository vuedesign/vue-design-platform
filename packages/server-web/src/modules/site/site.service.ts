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
        options = Object.assign(
            {
                relations: {
                    tags: true,
                    author: true,
                },
                select: {
                    author: {
                        id: true,
                        uuid: true,
                        avatar: true,
                        username: true,
                        nickname: true,
                        email: true,
                        phone: true,
                        password: true,
                        status: true,
                        rule: true,
                    },
                    tags: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
            },
            options,
        );
        return this.send({ module: 'site', method: 'findList' }, options);
    }

    findOneByUuid(uuid: string) {
        return this.send({ module: 'site', method: 'findOneByUuid' }, uuid);
    }
}
