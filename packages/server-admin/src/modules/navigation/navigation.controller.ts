import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Put,
    Query,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { NavigationService } from './navigation.service';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import {
    UpdateNavigationDto,
    UpdateFieldDto,
} from './dto/update-navigation.dto';
import { NavigationListDto } from './dto/navigation.dto';
import { Public } from '@/core/decorators/auth.decorator';
import { IPaginationOptions } from '@/globals/services/base.service';
import { NavigationEntity } from '@/entities/navigation.entity';

@Controller('navigations')
@ApiTags('导航模块')
@ApiBearerAuth()
export class NavigationController {
    constructor(private readonly navigationService: NavigationService) {}

    @Post()
    @ApiBody({
        description: '添加项目到导航',
        type: CreateNavigationDto,
    })
    create(@Body() createNavigationDto: CreateNavigationDto) {
        console.log('createNavigationDto', createNavigationDto);
        return this.navigationService.create(createNavigationDto);
    }

    @Get()
    findAll(
        @Query(new QueryTransformPipe(['title'])) query: NavigationListDto,
    ) {
        const { siteId, status, title, size, page, order } = query;
        const options: IPaginationOptions<NavigationEntity> = {
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
            where: {},
        };

        if (title) {
            options.where['title'] = Like(`%${title}%`);
        }

        if (status) {
            options.where['status'] = status;
        }

        if (siteId) {
            options.where['siteId'] = siteId;
        }

        if (order) {
            const [key, value] = order.split(' ');
            Object.assign(options, {
                order: {
                    [key]: value,
                },
            });
        }

        console.log('options', options);

        return this.navigationService.findAll(options);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.navigationService.findOneById(id);
    }

    @Get('site/:siteId')
    async findOneBySiteId(
        @Param('siteId', ParseIntPipe) siteId: number,
    ): Promise<boolean> {
        const res = await this.navigationService.findOne({
            where: {
                siteId,
            },
        });
        return !!res;
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSite: UpdateNavigationDto,
    ) {
        return this.navigationService.update(id, updateSite);
    }

    @Patch(':id')
    updateField(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateField: UpdateFieldDto,
    ) {
        return this.navigationService.updateField(id, updateField);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.navigationService.remove(id);
    }
}
