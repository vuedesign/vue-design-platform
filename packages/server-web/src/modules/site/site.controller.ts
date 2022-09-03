import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { SiteService } from './site.service';
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
  constructor(private readonly siteService: SiteService) {}

  @Public()
  @Get('/:uuid')
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
  findAll(@Query(new QueryTransformPipe(['title'])) query: SiteListQueryDto) {
    const {
      title,
      type,
      status,
      size = 20,
      page = 1,
      order,
      authorId,
      uuid,
    } = query;
    console.log('queryquery', query);
    const options: IPaginationOptions = {
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
      nots: {},
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

    if (authorId) {
      options.where['authorId'] = authorId;
    }
    if (uuid) {
      options.nots['uuid'] = uuid;
    }
    console.log('optionsoptionsoptions', options);
    return this.siteService.findList(options);
  }
}
