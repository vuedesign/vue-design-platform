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
  DefaultValuePipe,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto, UpdateFieldDto } from './dto/update-site.dto';
import { Like } from 'typeorm';
import { Public } from '../../core/decorators/auth.decorator';
import { SiteListQueryDto } from './dto/site.dto';
import { Request } from 'express';

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

  @Public()
  @Get()
  // @ApiQuery({
  //   description: '项目列表',
  //   // type: SiteListQueryDto,
  // })
  findAll(
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status?: number,
    @Query('order') order?: string,
    @Query('type') type?: string,
    @Query('title') title?: string,
  ) {
    console.log('size', size);
    console.log('page', page);
    // console.log('tagId', tagId);
    console.log('order', order); // new | hot | ai
    // const { size, page, order, tagId } = query;
    const options = {
      size,
      page,
      order: {
        // updatedAt: 'DESC',
      },
      where: {},
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

    if (status) {
      options.where['status'] = status;
    }

    if (title) {
      options.where['title'] = Like(`%${title}%`);
    }

    if (type) {
      if (type === 'all') {
        delete options.where['type'];
      } else {
        options.where['type'] = type;
      }
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
