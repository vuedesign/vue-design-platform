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
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto, UpdateFieldDto } from './dto/update-site.dto';
import { Like, FindOptionsRelations } from 'typeorm';
import { Public } from '@/core/decorators/auth.decorator';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { SiteListQueryDto } from './dto/site.dto';
import { Request } from 'express';
import { SiteEntity } from '@/entities/site.entity';

@Controller('sites')
@ApiTags('站点模块')
@ApiBearerAuth()
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  @ApiBody({
    description: '添加项目',
    type: CreateSiteDto,
  })
  create(@Body() createSite: CreateSiteDto, @Req() req: Request): Promise<any> {
    console.log('createSite', createSite, req.user);
    Object.assign(createSite, {
      authorId: 4,
      isShow: 1,
    });
    return this.siteService.create(createSite);
  }

  @Get()
  @ApiQuery({
    description: '项目列表',
    type: SiteListQueryDto,
  })
  findAll(@Query(new QueryTransformPipe(['title'])) query: SiteListQueryDto) {
    const { title, type, status, size, page, order } = query;
    console.log('size=========', query);
    console.log('order', order); // new | hot | ai

    type QueryDto = {
      size: number;
      page: number;
      order: Record<string, any>;
      where: Record<string, any>;
      relations: FindOptionsRelations<any>;
      select?: Record<string, any>;
    };
    const options: QueryDto = {
      size,
      page,
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
