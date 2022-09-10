import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { Controller, Get, Query } from '@nestjs/common';
import { Like } from 'typeorm';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NavigationService } from './navigation.service';
import { NavigationListDto } from './dto/navigation.dto';
import { Public } from '@/core/decorators/auth.decorator';
import { IPaginationOptions } from '@/globals/services/base.service';

@Controller('navigations')
@ApiTags('导航模块')
@ApiBearerAuth()
export class NavigationController {
    constructor(private readonly navigationService: NavigationService) {}

    // @Post()
    // @ApiBody({
    //   description: '添加项目到导航',
    //   type: CreateNavigationDto,
    // })
    // create(@Body() createNavigationDto: CreateNavigationDto) {
    //   return this.navigationService.create(createNavigationDto);
    // }

    @Public()
    @Get()
    findAll() {
        const options: IPaginationOptions = {
            pagination: { size: 20, page: 1 },
            order: {
                updatedAt: 'DESC',
            },
        };
        return this.navigationService.findList(options);
    }
}
