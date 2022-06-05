import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';
import {
  BaseService,
  IPaginationResponse,
  IPaginationQuery,
} from '@app/globals/services/base.service';
import { NavigationEntity } from '../../entities/navigation.entity';

@Injectable()
export class NavigationService extends BaseService {
  constructor(
    @InjectRepository(NavigationEntity)
    private readonly navigationRepository: Repository<NavigationEntity>,
  ) {
    super(navigationRepository);
  }

  create(createNavigation: CreateNavigationDto) {
    this.navigationRepository.create(createNavigation);
    return this.navigationRepository.save(createNavigation);
  }

  findAll(query: IPaginationQuery): Promise<IPaginationResponse> {
    return this.findListAndPage(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} navigation`;
  }

  update(id: number, updateNavigationDto: UpdateNavigationDto) {
    return `This action updates a #${id} navigation`;
  }

  remove(id: number) {
    return `This action removes a #${id} navigation`;
  }

  count() {
    return this.navigationRepository.count();
  }
}
