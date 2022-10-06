import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { ConfigListQueryDto } from './dto/config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { IPaginationOptions } from '@/globals/services/base.service';
import { ConfigEntity } from '@/entities/config.entity';
import { Like } from 'typeorm';

@ApiTags('配置模块')
// @ApiBearerAuth()
@Controller('configs')
export class ConfigController {
    constructor(private readonly configService: ConfigService) {}

    @Post()
    create(@Body() createConfigDto: CreateConfigDto) {
        return this.configService.create(createConfigDto);
    }

    @Get()
    @ApiQuery({
        description: '用户列表',
        type: ConfigListQueryDto,
    })
    findAll(
        @Query(new QueryTransformPipe(['search'])) query: ConfigListQueryDto,
    ) {
        const { size, page, search, status } = query;
        const options: IPaginationOptions<ConfigEntity> = {
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
            where: {},
        };

        console.log('options', options);

        const isPhone = (str: string) => {
            return !isNaN(Number(str));
        };

        if (search) {
            if (isPhone(search)) {
                options.where['key'] = Like(`%${search}%`);
            } else {
                options.where['value'] = Like(`%${search}%`);
            }
        }

        if (status) {
            options.where['status'] = status;
        }

        console.log('options.where===', options);

        return this.configService.findList(options);
    }

    @Get(':key/key')
    findOneByKey(@Param('key') key: string) {
        return this.configService.findOneByKey(key);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.configService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateConfigDto: UpdateConfigDto,
    ) {
        console.log('updateConfigDto', updateConfigDto);
        return this.configService.update(id, updateConfigDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.configService.remove(id);
    }
}
