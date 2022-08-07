import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginParam } from './dto/auth.dto';
import { getFieldType } from '@/core/utils';
import { BaseMicroservice } from '@/globals/services/base.microservice';
import { UserEntity } from '@/entities/user.entity';

@Injectable()
export class AuthService extends BaseMicroservice {
  async validateUser(formData: LoginParam): Promise<any> {
    console.log('formData', formData);
    const { password, account } = formData;
    let field: string = getFieldType(account);
    const where = {
      [field]: account,
    };
    console.log('where', where);
    type User = {
      password: string;
    };
    const user = await this.send<User>(
      { module: 'user', method: 'find-one' },
      where,
    );
    // const user = await this.userService.findOne(where);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  findOne(query: Record<string, any>) {
    return this.send({ module: 'user', method: 'find-one' }, query);
  }

  register(registerData: LoginParam) {
    return this.send<UserEntity>(
      { module: 'auth', method: 'register' },
      {
        phone: '',
        email: '',
        username: '',
        nickname: '',
        password: '',
        avatar: '',
        rule: 3, // 角色：1-超级管理员，2-管理员，3-普通用户
        isShow: 1, // 是否可用：1-可用，2-不可用
        ...registerData,
      },
    );
  }
}
