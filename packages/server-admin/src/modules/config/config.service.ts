import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { ConfigEntity } from '@/entities/config.entity';
import {
    BaseService,
    IPaginationResponse,
    IPaginationOptions,
} from '@/globals/services/base.service';

@Injectable()
export class ConfigService extends BaseService<ConfigEntity> {
    constructor(
        @InjectRepository(ConfigEntity)
        private readonly configRepository: Repository<ConfigEntity>,
    ) {
        super(configRepository);
    }

    async create(createConfig: CreateConfigDto) {
        const config = await this.configRepository.findOneBy({
            key: createConfig.key,
        });
        if (config) {
            return config;
        }
        this.configRepository.create(createConfig);
        return this.configRepository.save(createConfig);
    }

    findList(
        options: IPaginationOptions<ConfigEntity>,
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

    update(id: number, updateConfigDto: UpdateConfigDto) {
        return this.configRepository.update(id, updateConfigDto);
    }

    remove(id: number) {
        return this.configRepository.delete(id);
    }
}
