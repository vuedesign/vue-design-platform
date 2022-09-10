import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountEntity } from '@/entities/count.entity';
import { CreateCountDto } from './dto/create-count.dto';
import { UpdateCountDto } from './dto/update-count.dto';
import {
    BaseService,
    IPaginationResponse,
    IPaginationOptions,
} from '@/globals/services/base.service';

@Injectable()
export class CountService extends BaseService<CountEntity> {
    constructor(
        @InjectRepository(CountEntity)
        private readonly countRepository: Repository<CountEntity>,
    ) {
        super(countRepository);
    }
    create(createCount: Partial<CountEntity>) {
        this.countRepository.create(createCount);
        return this.countRepository.save(createCount);
    }

    findList(
        query: IPaginationOptions<CountEntity>,
    ): Promise<IPaginationResponse> {
        return this.findListAndPage(query);
    }

    findOne(where: Partial<CountEntity>) {
        return this.countRepository.findOne({
            where,
        });
    }

    findOneById(id: number) {
        return this.countRepository.findOne({
            where: { id },
        });
    }

    update(id: number, updateCount: UpdateCountDto) {
        return this.countRepository.update(id, updateCount);
    }

    remove(id: number) {
        return `This action removes a #${id} count`;
    }
}
