import { Injectable } from '@nestjs/common';
import { SiteEntity } from '@/entities/site.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@/globals/services/base.service';
import type { IOptions, IWhere, IRepository, IResponse } from './dto/site.dto';

@Injectable()
export class SiteService extends BaseService<SiteEntity> {
    constructor(
        @InjectRepository(SiteEntity)
        private readonly siteRepository: IRepository,
    ) {
        super(siteRepository);
    }

    findList(options: IOptions): Promise<IResponse> {
        return this.findListAndPage(options);
    }

    findOneBy(where: IWhere): Promise<SiteEntity> {
        return this.siteRepository.findOneBy(where);
    }

    findOne(options: IOptions): Promise<SiteEntity> {
        return this.siteRepository.findOne(options);
    }
}
