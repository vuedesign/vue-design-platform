import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
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
    const options: IPaginationOptions = {
      pagination: { size, page },
      order: {
        updatedAt: 'DESC',
      },
      where: {},
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
    return this.siteService.findList(options);
  }
}
