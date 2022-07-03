import { Controller, Post, HttpStatus } from '@nestjs/common';
import { LoginBodyDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginParam } from './dto/auth.dto';
import { getFieldType } from '../../core/utils';
import { MessagePattern, Transport } from '@nestjs/microservices';

@Controller()
export class AuthTcpController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @MessagePattern({ module: 'auth', method: 'login' }, Transport.TCP)
  async login(body: LoginBodyDto) {
    const { account, password } = body;
    console.log('account, password', account, password);
    const data = await this.authService.login({
      account,
      password,
    });
    console.log('data', data);
    return data;
  }

  @MessagePattern({ module: 'user', method: 'find-one' }, Transport.TCP)
  findOne(query: Record<string, any>) {
    return this.userService.findOne(query);
  }

  @MessagePattern({ module: 'auth', method: 'register' }, Transport.TCP)
  register(body: LoginParam) {
    // const { password, account } = body;
    // const field = getFieldType(account);
    // const where = {
    //   [field]: account,
    // };
    // const user = await this.userService.findOne(where);
    // if (user) {
    //   return {
    //     status: HttpStatus.CONFLICT,
    //     error: '用户名、邮箱、电话号已存在',
    //   };
    // }
    // const res = await this.authService.register({
    //   ...where,
    //   password,
    // });
    // console.log('res', res);
    return this.authService.register(body);
  }
}
