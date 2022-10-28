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
@Controller('configures')
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
    async findAll() {
        const options: IPaginationOptions<ConfigureEntity> = {
            pagination: { size: 20, page: 1 },
            order: {
                order: 'DESC',
            },
            where: {
                status: 1,
            },
        };

        const configureList = await this.configService.findList(options);
        let config = {};
        configureList.forEach((item) => {
            const { key, value, remark, link, group } = item;
            if (group) {
                if (!config[group]) {
                    config[group] = [];
                }
                config[group].push({
                    value,
                    remark,
                    link,
                    key,
                });
            } else {
                if (key) {
                    config[key] = {
                        value,
                        remark,
                        link,
                    };
                }
            }
        });

        return config;
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
        return this.configService.update(id, updateConfigureDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.configService.remove(id);
    }
}
