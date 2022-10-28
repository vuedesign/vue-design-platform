import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from '@/entities/tag.entity';
import {
    BaseService,
    IPaginationResponse,
    IPaginationOptions,
} from '@/globals/services/base.service';

@Injectable()
export class TagService extends BaseService<TagEntity> {
    constructor(
        @InjectRepository(TagEntity)
        private readonly siteRepository: Repository<TagEntity>,
    ) {
        super(siteRepository);
    }

    findList(
        options?: IPaginationOptions<TagEntity>,
    ): Promise<IPaginationResponse> {
        return this.findListAndPage(options);
    }

    findOneBy(where: FindOptionsWhere<TagEntity>) {
        return this.siteRepository.findOneBy(where);
    }
}
