import { Controller, Get, Query } from '@nestjs/common';
import { SiteService } from './site.service';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Like } from 'typeorm';
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
  @Get()
  @ApiQuery({
    description: '项目列表',
    type: SiteListQueryDto,
  })
  findAll(@Query(new QueryTransformPipe(['title'])) query: SiteListQueryDto) {
    const { title, type, status, size, page, order } = query;

    const options: IPaginationOptions = {
      pagination: { size, page },
      order: {
        updatedAt: 'DESC',
      },
      where: {},
      select: {
        author: {
          uuid: true,
          avatar: true,
          username: true,
          nickname: true,
        },
      },
      relations: {
        author: true,
      },
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

    return this.siteService.findList(options);
  }
}
