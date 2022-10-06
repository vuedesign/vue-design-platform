import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateConfigureDto } from './dto/create-configure.dto';
import { UpdateConfigureDto } from './dto/update-configure.dto';
import { ConfigureEntity } from '@/entities/configure.entity';
import {
    BaseService,
    IPaginationResponse,
    IPaginationOptions,
} from '@/globals/services/base.service';

@Injectable()
export class ConfigureService extends BaseService<ConfigureEntity> {
    constructor(
        @InjectRepository(ConfigureEntity)
        private readonly configRepository: Repository<ConfigureEntity>,
    ) {
        super(configRepository);
    }

    async create(createConfigure: CreateConfigureDto) {
        const config = await this.configRepository.findOneBy({
            key: createConfigure.key,
        });
        if (config) {
            return config;
        }
        this.configRepository.create(createConfigure);
        return this.configRepository.save(createConfigure);
    }

    findList(
        options: IPaginationOptions<ConfigureEntity>,
    ): Promise<IPaginationResponse> {
        return this.findListAndPage(options);
    }

    findOne(id: number) {
        return this.configRepository.findOneBy({
            id,
        });
    }

    findOneByKey(key: string) {
        return this.configRepository.findOneBy({
            key,
        });
    }

    update(id: number, updateConfigureDto: UpdateConfigureDto) {
        return this.configRepository.update(id, updateConfigureDto);
    }

    remove(id: number) {
        return this.configRepository.delete(id);
    }
}
