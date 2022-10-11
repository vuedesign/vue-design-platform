import { CountEntity } from '@/entities/count.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateCountDto } from './dto/create-count.dto';
import { UpdateCountDto } from './dto/update-count.dto';
import {
    BaseService,
    IPaginationOptions,
    IPaginationResponse,
} from '@/globals/services/base.service';

@Injectable()
export class CountService extends BaseService<CountEntity> {
    constructor(
        @InjectRepository(CountEntity)
        private readonly countRepository: Repository<CountEntity>,
    ) {
        super(countRepository);
    }
    findOneByAuthorId(authorId: number) {
        return this.countRepository.findOneBy({
            authorId,
        });
    }
}
