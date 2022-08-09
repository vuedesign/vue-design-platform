import {
  Controller,
  Req,
  Post,
  UnauthorizedException,
  Get,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginBodyDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '@/core/decorators/auth.decorator';
import { Response, Request } from 'express';
import { LoginParam } from './dto/auth.dto';
import { getFieldType } from '@/core/utils';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('登录模块')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    description: '添加用户信息',
    type: LoginBodyDto,
  })
  async login(
    @Body() body: LoginBodyDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const { account, password } = body;
    const user = await this.authService.validateUser(account, password);
    if (!user) {
      throw new UnauthorizedException('登录校验失败');
    }
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    // console.log('==token==', token);
    // req.session['user'] = user;
    // res.cookie(`token`, token, {
    //   maxAge: 564000,
    //   httpOnly: true,
    // });
    return { token, uuid: user.uuid };
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    console.log('===getProfile===', req.session['user']);
    if (!req.session || !req.session['user'] || !req.session['user'].id) {
      throw new UnauthorizedException('用户 session 过期');
    }
    return this.authService.findOne({ id: req.session['user'].id });
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
