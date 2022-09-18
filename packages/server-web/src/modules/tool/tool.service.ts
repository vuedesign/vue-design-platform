import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { LikeParam } from './dto/tool.dto';
import { BaseMicroservice } from '@/globals/services/base.microservice';

@Injectable()
export class ToolService extends BaseMicroservice {
    create(createToolDto: CreateToolDto) {
        return 'This action adds a new tool';
    }

    findAll() {
        return `This action returns all tools`;
    }

    findOne(id: number) {
        return `This action returns a #${id} tool`;
    }

    like(param: LikeParam) {
        return this.send({ module: 'tool', method: 'like' }, param);
    }

    remove(id: number) {
        return `This action removes a #${id} tool`;
    }
}
