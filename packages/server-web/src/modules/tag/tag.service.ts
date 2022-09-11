import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from '@/entities/tag.entity';
import {
    IPaginationResponse,
    IPaginationOptions,
} from '@/globals/services/base.service';
import { BaseMicroservice } from '@/globals/services/base.microservice';

@Injectable()
export class TagService extends BaseMicroservice {
    create(createTag: CreateTagDto) {
        // this.tagRepository.create(createTag);
        // return this.tagRepository.save(createTag);
    }

    findList(options?: IPaginationOptions): Promise<IPaginationResponse> {
        return this.send(
            {
                module: 'tag',
                method: 'findList',
            },
            options,
        );
    }

    findOne(id: number) {
        return this.send(
            {
                module: 'tag',
                method: 'findOne',
            },
            id,
        );
    }
}
