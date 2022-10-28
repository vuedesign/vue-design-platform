import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { IPaginationOptions } from '@/globals/services/base.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagListQueryDto } from './dto/tag.dto';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { TagEntity } from '@/entities/tag.entity';

@Controller('tags')
@ApiTags('标签模块')
@ApiBearerAuth()
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    findList(@Query(new QueryTransformPipe()) query: TagListQueryDto) {
        const { size = 20, page = 1 } = query;
        const opitions: IPaginationOptions<TagEntity> = {
            order: {
                updatedAt: 'DESC',
            },
            pagination: { page, size },
        };
        return this.tagService.findList(opitions);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tagService.findOneBy({ id });
    }
}
