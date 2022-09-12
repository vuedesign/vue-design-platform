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
        private readonly tagRepository: Repository<TagEntity>,
    ) {
        super(tagRepository);
    }

    async create(createTag: CreateTagDto) {
        const tag = await this.tagRepository.findOneBy({
            name: createTag.name,
        });
        if (tag) {
            return tag;
        }
        this.tagRepository.create(createTag);
        return this.tagRepository.save(createTag);
    }

    findList(
        options?: IPaginationOptions<TagEntity>,
    ): Promise<IPaginationResponse> {
        return this.findListAndPage(options);
    }

    findOneBy(where: FindOptionsWhere<TagEntity>) {
        return this.tagRepository.findOneBy(where);
    }

    findOne(id: number) {
        return this.tagRepository.findOneBy({
            id,
        });
    }

    update(id: number, updateTagDto: UpdateTagDto) {
        return this.tagRepository.update(id, updateTagDto);
    }

    remove(id: number) {
        return this.tagRepository.delete(id);
    }
}
