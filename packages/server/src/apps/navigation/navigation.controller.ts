import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { NavigationService } from './navigation.service';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';
import { Public } from '../../core/decorators/auth.decorator';

@Controller('navigations')
@ApiTags('导航模块')
@ApiBearerAuth()
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Public()
  @Post()
  @ApiBody({
    description: '添加项目到导航',
    type: CreateNavigationDto,
  })
  create(@Body() createNavigationDto: CreateNavigationDto) {
    return this.navigationService.create(createNavigationDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.navigationService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navigationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNavigationDto: UpdateNavigationDto,
  ) {
    return this.navigationService.update(+id, updateNavigationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navigationService.remove(+id);
  }
}
