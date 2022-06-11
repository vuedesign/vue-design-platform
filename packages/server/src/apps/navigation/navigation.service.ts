import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import {
  UpdateNavigationDto,
  UpdateFieldDto,
} from './dto/update-navigation.dto';
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
    return this.navigationRepository.findOne(id);
  }

  update(id: number, updateSite: UpdateNavigationDto) {
    return this.navigationRepository.update(id, updateSite);
  }

  updateField(id: number, updateField: UpdateFieldDto) {
    const value =
      updateField.type === 'number'
        ? Number(updateField.value)
        : updateField.value;
    return this.navigationRepository.update(id, {
      [updateField.field]: value,
    });
  }

  remove(id: number) {
    return this.navigationRepository.delete(id);
  }

  count() {
    return this.navigationRepository.count();
  }
}
