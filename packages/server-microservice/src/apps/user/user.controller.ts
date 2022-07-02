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
import { UserListQueryDto, findUserItemQuery } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '@/core/decorators/auth.decorator';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { UserEntity } from '@/entities/user.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @ApiBody({
  //   description: '添加用户信息',
  //   type: CreateUserDto,
  // })

  /**
   * 添加用户信息
   * @param createUserDto 用户信息
   * @returns
   */
  @MessagePattern({ role: 'user', cmd: 'create' })
  create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({
    description: '用户列表',
    type: UserListQueryDto,
  })
  findAll(@Query(new QueryTransformPipe(['search'])) query: UserListQueryDto) {
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

    if (status) {
      options.where['status'] = status;
    }

    if (rule) {
      options.where['rule'] = rule;
    }

    console.log('options.where===', options);

    return this.userService.findList(options);
  }

  /**
   * 统计用户数量
   * @Get('count')
   * @returns
   */
  @MessagePattern({ role: 'user', cmd: 'count' })
  count() {
    return this.userService.count();
  }

  /**
   * 用户信息
   * @Get(':id')
   * @param id 用户id
   * @returns
   */
  @MessagePattern({ role: 'user', cmd: 'find-one' })
  findOne(query: findUserItemQuery): Promise<UserEntity> {
    return this.userService.findOne(query);
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
