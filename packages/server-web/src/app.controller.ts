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
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginBodyDto } from './modules/auth/dto/auth.dto';
import { Public } from '@/core/decorators/auth.decorator';
import { Response, Request } from 'express';
import { LoginParam } from './modules/auth/dto/auth.dto';
import { getFieldType } from '@/core/utils';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    description: '添加用户信息',
    type: LoginBodyDto,
  })
  async login(
    @Body() body: LoginBodyDto,
    // @Res({ passthrough: true }) res: Response,
    // @Req() req: Request,
  ) {
    console.log('body====', body);
    // const { account, password } = body;
    // console.log('body', body);
    // const user = await this.authService.validateUser({
    //   account,
    //   password,
    // });
    // if (!user) {
    //   throw new UnauthorizedException('登录校验失败');
    // }
    // const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(body);
    // console.log('==token==', token);
    // req.session['user'] = user;
    // res.cookie(`token`, token, {
    //   maxAge: 564000,
    //   httpOnly: true,
    // });
    return { token };
  }
}
