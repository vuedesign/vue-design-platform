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
    async findList(options: IPaginationOptions<SiteEntity>) {
        const { userId, ...other } = options;
        const site = await this.siteService.findList(other);
        if (!userId) {
            return site;
        }
        const list = [];
        for await (const item of site.list || []) {
            const tool = await this.toolService.findOneBy({
                siteId: item.id,
                authorId: userId,
            });
            list.push(
                Object.assign(item, {
                    tool: {
                        top: tool ? tool.top : 0,
                        down: tool ? tool.down : 0,
                        collections: tool ? tool.collections : 0,
                    },
                }),
            );
        }
        return {
            ...site,
            list,
        };
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
