import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto, UpdateFieldDto } from './dto/update-site.dto';
import { SiteEntity } from '@/entities/site.entity';
import {
    BaseService,
    IPaginationResponse,
    IPaginationOptions,
} from '@/globals/services/base.service';

@Injectable()
export class SiteService extends BaseService<SiteEntity> {
    constructor(
        @InjectRepository(SiteEntity)
        private readonly siteRepository: Repository<SiteEntity>,
    ) {
        super(siteRepository);
    }
    create(createSite: CreateSiteDto) {
        this.siteRepository.create(createSite);
        return this.siteRepository.save(createSite);
    }

    findList(
        options: IPaginationOptions<SiteEntity>,
    ): Promise<IPaginationResponse> {
        return this.findListAndPage(options);
    }

    findOne(id: number) {
        return this.siteRepository.findOne({
            where: { id },
        });
    }

    findOneBy(where: Record<string, string | number>) {
        return this.siteRepository.findOne({
            where,
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
        });
    }

    update(id: number, updateSite: UpdateSiteDto) {
        return this.siteRepository.update(id, updateSite);
    }

    updateField(id: number, updateField: UpdateFieldDto) {
        const value =
            updateField.type === 'number'
                ? Number(updateField.value)
                : updateField.value;
        return this.siteRepository.update(id, {
            [updateField.field]: value,
        });
    }

    remove(id: number) {
        return this.siteRepository.delete(id);
    }

    count(options?: FindManyOptions<SiteEntity>) {
        return this.siteRepository.count(options);
    }
}
