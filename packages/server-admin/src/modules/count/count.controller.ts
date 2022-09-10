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
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CountService } from './count.service';
import { CreateCountDto } from './dto/create-count.dto';
import { UpdateCountDto } from './dto/update-count.dto';
import { CountListQueryDto } from './dto/count.dto';
import { IPaginationOptions } from '@/globals/services/base.service';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { CountEntity } from '@/entities/count.entity';
import { Public } from '@/core/decorators/auth.decorator';

@Controller('counts')
@ApiTags('统计模块')
@ApiBearerAuth()
export class CountController {
    constructor(private readonly countService: CountService) {}

    @Post()
    create(@Body() createCountDto: CreateCountDto) {
        return this.countService.create(createCountDto);
    }

    @Get()
    findAll(@Query(new QueryTransformPipe()) query: CountListQueryDto) {
        const { size, page } = query;
        const options: IPaginationOptions<CountEntity> = {
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
            where: {},
        };
        return this.countService.findList(options);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.countService.findOneById(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCountDto: UpdateCountDto) {
        return this.countService.update(+id, updateCountDto);
    }
}
