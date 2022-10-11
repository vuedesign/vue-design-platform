import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginParam } from './dto/auth.dto';
import { getFieldType } from '@/core/utils';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(formData: LoginParam): Promise<any> {
        console.log('formData', formData);
        const { password, account } = formData;
        let field: string = getFieldType(account);
        const where = {
            [field]: account,
        };
        console.log('where', where);
        const user = await this.userService.findOne(where);
        console.log('where', user);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginData: LoginParam) {
        const user = await this.validateUser(loginData);
        console.log('user', user);
        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload);
        return {
            ...payload,
            token,
        };
    }

    register(registerData: LoginParam) {
        return this.userService.create({
            phone: '',
            email: '',
            username: '',
            nickname: '',
            password: '',
            avatar: '',
            rule: 3, // 角色：1-超级管理员，2-管理员，3-普通用户
            isShow: 1, // 是否可用：1-可用，2-不可用
            ...registerData,
        });
    }
}
