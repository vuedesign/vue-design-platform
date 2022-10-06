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
import { ConfigureService } from './configure.service';
import { CreateConfigureDto } from './dto/create-configure.dto';
import { ConfigureListQueryDto } from './dto/configure.dto';
import { UpdateConfigureDto } from './dto/update-configure.dto';
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { IPaginationOptions } from '@/globals/services/base.service';
import { ConfigureEntity } from '@/entities/configure.entity';
import { Like } from 'typeorm';

@ApiTags('配置模块')
// @ApiBearerAuth()
@Controller('configs')
export class ConfigureController {
    constructor(private readonly configService: ConfigureService) {}

    @Post()
    create(@Body() createConfigureDto: CreateConfigureDto) {
        return this.configService.create(createConfigureDto);
    }

    @Get()
    @ApiQuery({
        description: '用户列表',
        type: ConfigureListQueryDto,
    })
    findAll(
        @Query(new QueryTransformPipe(['search'])) query: ConfigureListQueryDto,
    ) {
        const { size, page, search, status } = query;
        const options: IPaginationOptions<ConfigureEntity> = {
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
        @Body() updateConfigureDto: UpdateConfigureDto,
    ) {
        console.log('updateConfigureDto', updateConfigureDto);
        return this.configService.update(id, updateConfigureDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.configService.remove(id);
    }
}
