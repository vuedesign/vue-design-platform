import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from '../../entities/tag.entity';
import {
  BaseService,
  IPaginationResponse,
  IPaginationQuery,
} from '@app/globals/services/base.service';

interface PaginationQuery extends IPaginationQuery {
  order: any;
}

@Injectable()
export class TagService extends BaseService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {
    super(tagRepository);
  }
  create(createTag: CreateTagDto) {
    this.tagRepository.create(createTag);
    return this.tagRepository.save(createTag);
  }

  findAll(query?: PaginationQuery): Promise<IPaginationResponse> {
    return this.findListAndPage(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
