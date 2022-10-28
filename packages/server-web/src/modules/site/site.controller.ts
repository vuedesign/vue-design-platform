import {
    Controller,
    Get,
    Param,
    Query,
    Req,
    Res,
    Post,
    Body,
    UnauthorizedException,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { ToolService } from '../tool/tool.service';
import { TagService } from '../tag/tag.service';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Like } from 'typeorm';
import { User } from '@/core/decorators/user.decorator';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { SiteListQueryDto, IOptions } from './dto/site.dto';
import { TagEntity } from '@/entities/tag.entity';
import { CreateSiteDto } from './dto/create-site.dto';

@Controller('sites')
@ApiTags('站点模块')
@ApiBearerAuth()
export class SiteController {
    constructor(
        private readonly siteService: SiteService,
        private readonly toolService: ToolService,
        private readonly tagService: TagService,
    ) {}

    @Post()
    @ApiBody({
        description: '添加项目',
        type: CreateSiteDto,
    })
    async create(
        @Body() createSite: CreateSiteDto,
        @User('id') authorId: number,
    ): Promise<any> {
        if (!authorId) {
            return false;
        }
        const tags: (Promise<TagEntity> | TagEntity)[] = [];
        for await (const item of createSite.tags) {
            const tag = await this.tagService.findOneBy({
                name: item.name,
            });
            if (tag) {
                tags.push(tag);
            } else {
                tags.push(item);
            }
        }
        Object.assign(createSite, {
            authorId,
            isShow: 1,
            tags,
        });
        const res = await this.siteService.create(createSite);
        return res;
    }

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
        const options: IOptions = {
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
        const options: IOptions = {
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

    @Get(':uuid')
    @ApiQuery({
        description: '项目详情',
        type: String,
    })
    findOne(@Param('uuid') uuid: string) {
        const options: IOptions = {
            where: { uuid },
            relations: {
                tags: true,
                author: true,
            },
            select: {
                author: {
                    uuid: true,
                    avatar: true,
                    nickname: true,
                },
                tags: {
                    id: true,
                    name: true,
                },
            },
        };
        return this.siteService.findOne(options);
    }

    @Get()
    @ApiQuery({
        description: '项目列表',
        type: SiteListQueryDto,
    })
    async findAll(
        @Query(new QueryTransformPipe(['title']))
        query: SiteListQueryDto,
        @User('id') userId: number,
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
        const options: IOptions = {
            relations: {
                tags: true,
                author: true,
            },
            select: {
                author: {
                    uuid: true,
                    avatar: true,
                    nickname: true,
                },
                tags: {
                    id: true,
                    name: true,
                },
            },
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
            where: {},
            userId,
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
        const site = await this.siteService.findList(options);

        if (!userId) {
            return site;
        }
        const siteList = site.list || [];
        let list = [];
        for await (const siteItem of siteList) {
            const tool = await this.toolService.findOne({
                siteId: siteItem.id,
                authorId,
            });
            if (tool) {
                Object.assign(siteItem, {
                    tool,
                });
            }
            list.push(siteItem);
        }
        return {
            ...site,
            list,
        };
    }
}
