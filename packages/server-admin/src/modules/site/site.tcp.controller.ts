import { Controller } from '@nestjs/common';
import { SiteService } from './site.service';
import { ToolService } from '@/modules/tool/tool.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { IPaginationOptions } from '@/globals/services/base.service';
import { SiteEntity } from '@/entities/site.entity';
import { FindManyOptions } from 'typeorm';

/**
 * 站点模块
 */
@Controller()
export class SiteTcpController {
    constructor(
        private readonly siteService: SiteService,
        private readonly toolService: ToolService,
    ) {}
    /**
     * 站点列表
     */
    @MessagePattern({ module: 'site', method: 'findList' }, Transport.TCP)
    findList(options: IPaginationOptions<SiteEntity>) {
        return this.siteService.findList(options);
    }

    @MessagePattern({ module: 'site', method: 'findOneBy' }, Transport.TCP)
    async findOneBy({ authorId, uuid }) {
        const site = await this.siteService.findOneBy({ uuid });
        if (!authorId) {
            return site;
        }
        const tool = await this.toolService.findOneBy({
            siteId: site.id,
            authorId,
        });
        Object.assign(site, {
            tool: {
                top: tool.top,
                down: tool.down,
                collections: tool.collections,
            },
        });
        return site;
    }
}
