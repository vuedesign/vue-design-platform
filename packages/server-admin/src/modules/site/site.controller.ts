import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
    Patch,
    Req,
    ParseIntPipe,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { TagService } from '../tag/tag.service';
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto, UpdateFieldDto } from './dto/update-site.dto';
import { Like } from 'typeorm';
import { Public } from '@/core/decorators/auth.decorator';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { SiteListQueryDto } from './dto/site.dto';
import { Request } from 'express';
import { IPaginationOptions } from '@/globals/services/base.service';
import { SiteEntity } from '@/entities/site.entity';
import { TagEntity } from '@/entities/tag.entity';

@Controller('sites')
@ApiTags('站点模块')
@ApiBearerAuth()
export class SiteController {
    constructor(
        private readonly siteService: SiteService,
        private readonly tagService: TagService,
    ) {}

    @Post()
    @ApiBody({
        description: '添加项目',
        type: CreateSiteDto,
    })
    async create(
        @Body() createSite: CreateSiteDto,
        @Req() req: Request,
    ): Promise<any> {
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
            authorId: 4,
            isShow: 1,
            tags,
        });
        const res = await this.siteService.create(createSite);
        return res;
    }

    @Get()
    @ApiQuery({
        description: '项目列表',
        type: SiteListQueryDto,
    })
    findAll(@Query(new QueryTransformPipe(['title'])) query: SiteListQueryDto) {
        const { title, type, status, size, page, order } = query;
        const options: IPaginationOptions<SiteEntity> = {
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
            where: {},
            relations: {
                tags: true,
                author: true,
            },
            select: {
                author: {
                    id: true,
                    uuid: true,
                    avatar: true,
                    username: true,
                    nickname: true,
                    email: true,
                    phone: true,
                    password: true,
                    status: true,
                    rule: true,
                },
                tags: {
                    id: true,
                    name: true,
                    description: true,
                },
            },
        };

        if (order) {
            // const [orderKey, orderValue]: Array<string> = order.split(' ');
            // options.order[orderKey] = orderValue;
            console.log('order', order);
            if (order === 'hot') {
                options.order = {
                    views: 'DESC',
                };
            } else {
                options.order = {
                    updatedAt: 'DESC',
                };
            }
        } else {
            options.order = {
                updatedAt: 'DESC',
            };
        }

        if (title) {
            options.where['title'] = Like(`%${title}%`);
        }

        if (status) {
            options.where['status'] = status;
        }

        if (type) {
            options.where['type'] = type;
        }
        console.log('options', options);
        return this.siteService.findList(options);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.siteService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSite: UpdateSiteDto,
    ) {
        return this.siteService.update(id, updateSite);
    }

    @Patch(':id')
    updateField(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateField: UpdateFieldDto,
    ) {
        return this.siteService.updateField(id, updateField);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.siteService.remove(id);
    }
}
