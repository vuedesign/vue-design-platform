import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateToolDto } from './dto/create-tool.dto';
import { LikeParam, FindOneQuery } from './dto/tool.dto';
import { BaseService } from '@/globals/services/base.service';
import { ToolEntity } from '@/entities/tool.entity';

@Injectable()
export class ToolService extends BaseService<ToolEntity> {
    constructor(
        @InjectRepository(ToolEntity)
        private readonly toolRepository: Repository<ToolEntity>,
    ) {
        super(toolRepository);
    }

    findOne({ siteId, authorId }: FindOneQuery): Promise<ToolEntity> {
        return this.toolRepository.findOneBy({ siteId, authorId });
    }

    async like(param: LikeParam) {
        const { type, value, ...where } = param;
        const res = await this.toolRepository.findOneBy(where);
        if (!res) {
            const data = {
                ...where,
                collections: 0,
                top: 0,
                down: 0,
                [type]: 1,
            };
            await this.toolRepository.create();
            const createRes = await this.toolRepository.save(data);
            return !!createRes;
        }
        const data = {
            ...where,
            collections: res.collections,
            top: res.top,
            down: res.down,
            [type]: ~~!res[type],
        };
        const updateRes = await this.toolRepository.update(res.id, data);
        return !!updateRes.affected;
    }
}
