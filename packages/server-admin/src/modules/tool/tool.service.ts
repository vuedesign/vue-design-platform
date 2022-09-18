import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToolDto } from './dto/create-tool.dto';
import { LikeParam } from './dto/tool.dto';
import { ToolEntity } from '@/entities/tool.entity';

@Injectable()
export class ToolService {
    constructor(
        @InjectRepository(ToolEntity)
        private readonly toolRepository: Repository<ToolEntity>,
    ) {}

    create(createTool: CreateToolDto) {
        return `xxx${createTool}`;
    }

    findAll() {
        return `This action returns all tools`;
    }

    findOne(id: number) {
        return `This action returns a #${id} tool`;
    }

    async like(param: LikeParam) {
        console.log('x', param);
        const { type, ...where } = param;
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

    remove(id: number) {
        return `This action removes a #${id} tool`;
    }
}
