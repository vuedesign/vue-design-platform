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
  create(createCountDto: CreateCountDto) {
    return 'This action adds a new count';
  }

  findList(
    query: IPaginationOptions<CountEntity>,
  ): Promise<IPaginationResponse> {
    return this.findListAndPage(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} count`;
  }

  update(id: number, updateCountDto: UpdateCountDto) {
    return `This action updates a #${id} count`;
  }

  remove(id: number) {
    return `This action removes a #${id} count`;
  }
}
