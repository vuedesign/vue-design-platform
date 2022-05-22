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
  DefaultValuePipe,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../../core/decorators/auth.decorator';

@Controller('users')
@ApiTags('用户模块')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    description: '添加用户信息',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('search') search?: string,
    @Query('order') order?: string,
    @Query('isShow', new DefaultValuePipe(0), ParseIntPipe) isShow?: number,
    @Query('rule', new DefaultValuePipe(0), ParseIntPipe) rule?: number,
  ) {
    const options = {
      size,
      page,
      order: {
        updatedAt: 'DESC',
      },
      where: {},
    };

    const isPhone = (str: string) => {
      return !isNaN(Number(str));
    };

    if (search) {
      if (isPhone(search)) {
        options.where['phone'] = Like(`%${search}%`);
      } else {
        options.where['username'] = Like(`%${search}%`);
      }
    }

    if (isShow !== undefined) {
      if (isShow === 1 || isShow === 2) {
        options.where['isShow'] = isShow;
      } else {
        delete options.where['isShow'];
      }
    }

    if (rule !== undefined) {
      if (rule === 1 || rule === 2 || rule === 3) {
        options.where['rule'] = rule;
      } else {
        delete options.where['rule'];
      }
    }

    console.log('options.where===', options);

    return this.userService.findList(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne({
      id,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
