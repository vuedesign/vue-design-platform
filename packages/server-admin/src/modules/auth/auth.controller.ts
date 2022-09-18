import {
    Controller,
    Req,
    Post,
    UnauthorizedException,
    Get,
    Body,
    Res,
    HttpStatus,
    HttpException,
    Put,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginBodyDto, AuthRequest } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Public } from '../../core/decorators/auth.decorator';
import { Response, Request } from 'express';
import { LoginParam, LikeParam } from './dto/auth.dto';
import { getFieldType } from '../../core/utils';

@Controller('auth')
@ApiTags('auth模块')
@ApiBearerAuth()
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @Public()
    @Post('login')
    @ApiBody({
        description: '添加用户信息',
        type: LoginBodyDto,
    })
    async login(
        @Body() body: LoginBodyDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { account, password } = body;
        console.log('account, password', account, password);
        const data = await this.authService.login({
            account,
            password,
        });
        console.log('data', data);
        // res.cookie('token', data.token);
        return data;
    }

    @Get('profile')
    getProfile(@Req() req: AuthRequest) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException('用户没授权');
        }
        return this.userService.findOne({ id: req.user.id });
    }

    @Get('logout')
    logout(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException('用户没授权');
        }
        res.cookie('token', null);
        return true;
    }

    @Public()
    @Post('register')
    async register(@Body() body: LoginParam) {
        const { password, account } = body;
        const field = getFieldType(account);
        const where = {
            [field]: account,
        };
        const user = await this.userService.findOne(where);
        if (user) {
            return {
                status: HttpStatus.CONFLICT,
                error: '用户名、邮箱、电话号已存在',
            };
        }
        const res = await this.authService.register({
            ...where,
            password,
        });
        console.log('res', res);
        return res;
    }

    @Put('like')
    like(@Body() body: LikeParam) {}
}
