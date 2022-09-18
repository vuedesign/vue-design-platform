import {
    Controller,
    Get,
    Param,
    Query,
    Req,
    UnauthorizedException,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { UserService } from '../user/user.service';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Like, Not, Equal } from 'typeorm';
import { Public } from '@/core/decorators/auth.decorator';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { SiteListQueryDto } from './dto/site.dto';
import { IPaginationOptions } from '@/globals/services/base.service';

@Controller('sites')
@ApiTags('站点模块')
@ApiBearerAuth()
export class SiteController {
    constructor(
        private readonly siteService: SiteService,
        private readonly userService: UserService,
    ) {}
    @Get('profile')
    @ApiQuery({
        description: '项目列表',
        type: SiteListQueryDto,
    })
    profile(
        @Query(new QueryTransformPipe()) query: SiteListQueryDto,
        @Req() req,
    ) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException();
        }
        const { size = 20, page = 1 } = query;
        const options: IPaginationOptions = {
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
            where: {},
            nots: {},
        };

        if (req.user.id) {
            options.where['authorId'] = req.user.id;
        }
        return this.siteService.findList(options);
    }

    @Public()
    @Get(':uuid/associate')
    @ApiQuery({
        description: '详情相关项目列表',
        type: SiteListQueryDto,
    })
    findAssociate(
        @Param('uuid') uuid: string,
        @Query(new QueryTransformPipe()) query: SiteListQueryDto,
    ) {
        const { size = 2, page = 1, authorId } = query;
        const options: IPaginationOptions = {
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
            where: {},
            nots: {},
        };
        if (uuid) {
            options.nots['uuid'] = uuid;
        }
        if (authorId) {
            options.where['authorId'] = authorId;
        }
        return this.siteService.findList(options);
    }

    @Public()
    @Get(':uuid')
    @ApiQuery({
        description: '项目详情',
        type: String,
    })
    findOne(@Param('uuid') uuid: string) {
        return this.siteService.findOneByUuid(uuid);
    }

    @Public()
    @Get()
    @ApiQuery({
        description: '项目列表',
        type: SiteListQueryDto,
    })
    async findAll(
        @Query(new QueryTransformPipe(['title']))
        query: SiteListQueryDto,
    ) {
        const {
            title,
            type,
            status,
            size = 20,
            page = 1,
            order,
            authorId,
        } = query;
        const options: IPaginationOptions = {
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
            where: {},
        };

        if (order) {
            if (order === 'hot') {
                options.order = {
                    views: 'DESC',
                };
            } else if (order === 'new') {
                options.order = {
                    createdAt: 'DESC',
                };
            } else {
                options.order = {
                    updatedAt: 'DESC',
                };
            }
        }

        if (title) {
            options.where['title'] = Like(`%${title}%`);
        }

        if (status) {
            options.where['status'] = status;
        }

        if (type && type !== 'all') {
            options.where['type'] = type;
        }

        if (authorId) {
            options.where['authorId'] = authorId;
        }
        const data = await this.siteService.findList(options);
        console.log('options==x=x', options);
        console.log('options==x=xdata', data);
        return data;
    }
}
