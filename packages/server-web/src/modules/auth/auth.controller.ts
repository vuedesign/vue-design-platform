import {
    Controller,
    Req,
    Post,
    UnauthorizedException,
    Get,
    Body,
    Res,
    HttpStatus,
    Inject,
    CACHE_MANAGER,
    Param,
} from '@nestjs/common';
// import { CACHE_MANAGER } from '@nestjs/core';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginBodyDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '@/core/decorators/auth.decorator';
import { User } from '@/core/decorators/user.decorator';
import { Response, Request } from 'express';
import { LoginParam } from './dto/auth.dto';
import { getFieldType } from '@/core/utils';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { RsaService } from '@/globals/services/rsa.service';

@Controller('auth')
@ApiTags('登录模块')
@ApiBearerAuth()
export class AuthController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private authService: AuthService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private rsaService: RsaService,
    ) {}

    @Get('public-key')
    publicKey() {
        const value = this.configService.get('PUBLIC_KEY');
        return value;
    }

    @Post('login')
    @ApiBody({
        description: '添加用户信息',
        type: LoginBodyDto,
    })
    async login(
        @Body() body: LoginBodyDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req,
    ) {
        const { account, password } = body;

        const newPassword = this.rsaService.decrypt(password);
        const user = await this.authService.validateUser(account);
        if (!user) {
            throw new UnauthorizedException('用户名错误');
        }
        const oldPassword = this.rsaService.decrypt(user.password);
        if (newPassword !== oldPassword) {
            throw new UnauthorizedException('用户密码错误');
        }
        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload);
        res.cookie('token', token, {
            httpOnly: true,
        });
        return {
            token,
            user,
        };
    }

    @Get('profile')
    getProfile(@User('id') userId: number) {
        if (!userId) {
            return null;
        }
        return this.authService.findOne({ id: userId });
    }

    @Get('logout')
    logout(@Req() req, @Res({ passthrough: true }) res: Response) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException('用户没授权');
        }
        console.log('# =================logout');
        req.user = null;
        res.clearCookie('token');
        // req.session.user = null;
        // req.session.token = null;
        return true;
    }

    @ApiBody({
        description: '注册',
        type: LoginBodyDto,
    })
    @Post('register')
    async register(@Body() body: LoginParam) {
        const { password, account } = body;
        const field = getFieldType(account);
        const where = {
            [field]: account,
        };
        const user = await this.authService.findOne(where);
        if (user) {
            throw new UnauthorizedException('用户名、邮箱、电话号已存在');
        }
        const res = await this.authService.register({
            ...where,
            password,
        });
        return res;
    }
}
