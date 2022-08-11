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
} from '@nestjs/common';
// import { CACHE_MANAGER } from '@nestjs/core';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginBodyDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '@/core/decorators/auth.decorator';
import { Response, Request } from 'express';
import { LoginParam } from './dto/auth.dto';
import { getFieldType } from '@/core/utils';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Cache } from 'cache-manager';

@Controller('auth')
@ApiTags('登录模块')
@ApiBearerAuth()
export class AuthController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  @ApiBody({
    description: '添加用户信息',
    type: LoginBodyDto,
  })
  async login(@Body() body: LoginBodyDto, @Req() req: Request) {
    const { account, password } = body;
    const user = await this.authService.validateUser(account, password);
    if (!user) {
      throw new UnauthorizedException('登录校验失败');
    }
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.cacheManager.set('id', user.id);
    // req.user = payload;
    return token;
  }

  @Get('profile')
  async getProfile(@Req() req) {
    const id = await this.cacheManager.get('id');
    console.log('id', id);
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException();
    }
    return this.authService.findOne({ id: req.user.id });
  }

  @Get('logout')
  logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('用户没授权');
    }
    res.cookie('token', null);
    return true;
  }

  @Public()
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
      return {
        status: HttpStatus.CONFLICT,
        error: '用户名、邮箱、电话号已存在',
      };
    }
    const res = await this.authService.register({
      ...where,
      password,
    });
    return res;
  }
}
