import { Like } from 'typeorm';
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagListQueryDto } from './dto/tag.dto';
import { IPaginationOptions } from '@/globals/services/base.service';
import { TagEntity } from '@/entities/tag.entity';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';

@Controller('tags')
@ApiTags('标签模块')
@ApiBearerAuth()
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    @ApiBody({
        description: '添加项目',
        type: CreateTagDto,
    })
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }

    @Get()
    findList(@Query(new QueryTransformPipe(['name'])) query: TagListQueryDto) {
        const { size, page, name } = query;
        const opitions: IPaginationOptions<TagEntity> = {
            order: {
                updatedAt: 'DESC',
            },
            pagination: { page, size },
            where: {},
        };
        if (name) {
            opitions.where['name'] = Like(`%${name}%`);
        }
        return this.tagService.findList(opitions);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagService.update(+id, updateTagDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tagService.remove(+id);
    }
}
