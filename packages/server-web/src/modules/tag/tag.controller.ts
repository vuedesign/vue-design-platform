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
import { Public } from '@/core/decorators/auth.decorator';

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

    // @Public()
    @Get()
    findList(@Query() query: TagListQueryDto) {
        const { size, page } = query;
        const opitions: IPaginationOptions = {
            order: {
                updatedAt: 'DESC',
            },
            pagination: { page, size },
        };
        return this.tagService.findList(opitions);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tagService.findOne(id);
    }
}
