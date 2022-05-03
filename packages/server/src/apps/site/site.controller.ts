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
@ApiTags('项目模块')
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
    @Query('tagId', new DefaultValuePipe(0), ParseIntPipe) tagId?: number,
    @Query('order') order?: string,
  ) {
    console.log('size', size);
    console.log('page', page);
    console.log('tagId', tagId);
    console.log('order', order);
    // const { size, page, order, tagId } = query;
    const options = {
      size,
      page,
      order: {
        updatedAt: 'DESC',
      },
      where: {},
    };

    if (order) {
      const [orderKey, orderValue]: Array<string> = order.split(' ');
      options.order[orderKey] = orderValue;
    }

    if (tagId) {
      options.where['tagIds'] = Like(`%${tagId}%`);
    }

    return this.siteService.findListAndPage(options);
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
    console.log('updateField', id, updateField);
    return this.siteService.updateField(id, updateField);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.siteService.remove(id);
  }
}
