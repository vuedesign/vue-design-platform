import { Controller } from '@nestjs/common';
import { ConfigService } from './config.service';
import { SiteService } from '@/modules/site/site.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
// import { FindOneQuery } from './dto/config.dto';

/**
 * 工具模块
 */
@Controller()
export class ConfigTcpController {
    constructor(private readonly configService: ConfigService) {}

    @MessagePattern({ module: 'config', method: 'find' }, Transport.TCP)
    findOne({ siteId, authorId }) {
        return {};
    }
}
