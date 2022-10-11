import {
    Controller,
    Get,
    Put,
    Body,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserListQueryDto } from './dto/user.dto';
import { IPaginationOptions } from '@/globals/services/base.service';
import { UserEntity } from '@/entities/user.entity';

@Controller('users')
@ApiTags('用户模块')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Put(':id')
    @ApiBody({
        description: '添加用户信息',
        type: CreateUserDto,
    })
    update(
        @Body() createUserDto: Partial<UserEntity>,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.userService.update(id, createUserDto);
    }

    @Get(':uuid')
    findOneByUuid(@Param('uuid') uuid: string) {
        return this.userService.findOneBy({ uuid });
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOneBy({
            id,
        });
    }

    @Get()
    findList(@Query() query: UserListQueryDto) {
        const { size = 20, page = 1 } = query;
        const options: IPaginationOptions<UserEntity> = {
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
        };
        return this.userService.findList(options);
    }
}
