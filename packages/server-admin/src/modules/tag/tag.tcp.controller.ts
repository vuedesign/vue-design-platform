import { Controller } from '@nestjs/common';
import { TagService } from './tag.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { IPaginationOptions } from '@/globals/services/base.service';
import { TagEntity } from '@/entities/tag.entity';

/**
 * 站点模块
 */
@Controller()
export class TagTcpController {
    constructor(private readonly tagService: TagService) {}
    /**
     * 站点列表
     */
    @MessagePattern({ module: 'tag', method: 'findList' }, Transport.TCP)
    findList(options: IPaginationOptions<TagEntity>) {
        return this.tagService.findList(options);
    }

    @MessagePattern({ module: 'tag', method: 'findOne' }, Transport.TCP)
    findOne(id: number) {
        return this.tagService.findOneBy({ id });
    }
}
