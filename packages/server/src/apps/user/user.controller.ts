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
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserListQueryDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../../core/decorators/auth.decorator';
import { String2numberPipe } from '@/core/pipes/string2number.pipe';

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
  @ApiQuery({
    description: '项目列表',
    type: UserListQueryDto,
  })
  findAll(@Query(new String2numberPipe(['search'])) query: UserListQueryDto) {
    const { size, page, search, status, rule } = query;
    const options = {
      size,
      page,
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
        options.where['phone'] = Like(`%${search}%`);
      } else {
        options.where['username'] = Like(`%${search}%`);
      }
    }

    if (status !== undefined) {
      if (status === 1 || status === 2) {
        options.where['status'] = status;
      } else {
        delete options.where['status'];
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

  @Get('count')
  count() {
    return this.userService.count();
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
