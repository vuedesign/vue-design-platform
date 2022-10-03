import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { LikeParam, FindOneQuery } from './dto/tool.dto';
import { BaseMicroservice } from '@/globals/services/base.microservice';
import { ToolEntity } from '@/entities/tool.entity';

@Injectable()
export class ToolService extends BaseMicroservice {
    create(createToolDto: CreateToolDto) {
        return 'This action adds a new tool';
    }

    findAll() {
        return `This action returns all tools`;
    }

    findOne({ siteId, authorId }: FindOneQuery): Promise<ToolEntity> {
        return this.send(
            { module: 'tool', method: 'find-one' },
            { siteId, authorId },
        );
    }

    like(param: LikeParam): Promise<boolean> {
        return this.send({ module: 'tool', method: 'like' }, param);
    }

    remove(id: number) {
        return `This action removes a #${id} tool`;
    }
}
