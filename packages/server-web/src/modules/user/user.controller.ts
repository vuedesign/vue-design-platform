import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserListQueryDto } from './dto/user.dto';
import { Public } from '@/core/decorators/auth.decorator';
import { IPaginationOptions } from '@/globals/services/base.service';

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
        return this.userService.findOne({
            id,
        });
    }

    @Public()
    @Get()
    findList(@Query() query: UserListQueryDto) {
        const { size = 20, page = 1 } = query;
        const options: IPaginationOptions = {
            pagination: { size, page },
            order: {
                updatedAt: 'DESC',
            },
        };
        return this.userService.findList(options);
    }
}
