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

  @Public()
  @Get(':uuid')
  findOneByUuid(@Param('uuid') uuid: string) {
    return this.userService.findOne({ uuid });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('id===user', id);
    return this.userService.findOne({
      id,
    });
  }
}
