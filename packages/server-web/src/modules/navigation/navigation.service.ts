import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NavigationEntity } from '@/entities/navigation.entity';
import {
    BaseService,
    IPaginationOptions,
    IPaginationResponse,
} from '@/globals/services/base.service';

@Injectable()
export class NavigationService extends BaseService<NavigationEntity> {
    constructor(
        @InjectRepository(NavigationEntity)
        private readonly navigationRepository: Repository<NavigationEntity>,
    ) {
        super(navigationRepository);
    }
    findList(
        options: IPaginationOptions<NavigationEntity>,
    ): Promise<IPaginationResponse<NavigationEntity>> {
        return this.findListAndPage(options);
    }
}
