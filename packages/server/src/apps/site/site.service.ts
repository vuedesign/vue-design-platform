import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto, UpdateFieldDto } from './dto/update-site.dto';
import { SiteEntity } from '../../entities/site.entity';
import {
  BaseService,
  IPaginationResponse,
  IPaginationQuery,
} from '@app/globals/services/base.service';

@Injectable()
export class SiteService extends BaseService {
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

  findListAndPage(query: IPaginationQuery): Promise<IPaginationResponse> {
    return this.findListAndPage(query);
  }

  findOne(id: number) {
    return this.siteRepository.findOne({
      where: { id },
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
}
