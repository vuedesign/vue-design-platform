import { Controller } from '@nestjs/common';
import { ToolService } from './tool.service';
import { SiteService } from '@/modules/site/site.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { LikeParam, FindOneQuery } from './dto/tool.dto';

/**
 * 工具模块
 */
@Controller()
export class ToolTcpController {
    constructor(
        private readonly toolService: ToolService,
        private readonly siteService: SiteService,
    ) {}
    @MessagePattern({ module: 'tool', method: 'like' }, Transport.TCP)
    async like(param: LikeParam) {
        const siteRes = await this.siteService.findOne(param.siteId);
        this.siteService.update(siteRes.id, {
            [param.type]:
                param.value === 1
                    ? siteRes[param.type] - 1
                    : siteRes[param.type] + 1,
        });
        const toolRes = await this.toolService.like(param);
        return toolRes;
    }

    @MessagePattern({ module: 'tool', method: 'find-one' }, Transport.TCP)
    findOne({ siteId, authorId }: FindOneQuery) {
        return this.toolService.findOneBy({
            siteId,
            authorId,
        });
    }
}
