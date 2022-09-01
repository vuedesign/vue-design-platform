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
  Inject,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserListQueryDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '@/core/decorators/auth.decorator';
import { QueryTransformPipe } from '@/core/pipes/queryTransform.pipe';
import { UserEntity } from '@/entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('users')
@ApiTags('用户模块')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiBody({
    description: '添加用户信息',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // @ApiQuery({
  //   description: '用户列表',
  //   type: UserListQueryDto,
  // })
  // findAll(@Query(new QueryTransformPipe(['search'])) query: UserListQueryDto) {
  //   const { size, page, search, status, rule } = query;
  //   const options = {
  //     size,
  //     page,
  //     order: {
  //       updatedAt: 'DESC',
  //     },
  //     where: {},
  //   };

  //   console.log('options', options);

  //   const isPhone = (str: string) => {
  //     return !isNaN(Number(str));
  //   };

  //   if (search) {
  //     if (isPhone(search)) {
  //       options.where['phone'] = Like(`%${search}%`);
  //     } else {
  //       options.where['username'] = Like(`%${search}%`);
  //     }
  //   }

  //   if (status) {
  //     options.where['status'] = status;
  //   }

  //   if (rule) {
  //     options.where['rule'] = rule;
  //   }

  //   console.log('options.where===', options);

  //   return this.userService.findList(options);
  // }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('id===user', id);
    return this.userService.findOne({
      id,
    });
  }
}
