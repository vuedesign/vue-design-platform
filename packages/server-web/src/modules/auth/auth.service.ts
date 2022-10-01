import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginParam } from './dto/auth.dto';
import { getFieldType } from '@/core/utils';
import { BaseMicroservice } from '@/globals/services/base.microservice';
import { UserEntity } from '@/entities/user.entity';
import { decrypt } from '@/core/utils';

@Injectable()
export class AuthService extends BaseMicroservice {
    async validateUser(account: string, newPassword: string): Promise<any> {
        let field: string = getFieldType(account);
        const where = {
            [field]: account,
        };
        type User = {
            password: string;
        };
        const user = await this.send<User>(
            { module: 'user', method: 'find-one' },
            where,
        );
        if (!user) {
            return null;
        }
        const oldPassword = decrypt(user.password);
        if (oldPassword !== newPassword) {
            throw new UnauthorizedException('登录密码错误');
        }

        const { password, ...result } = user;
        return result;
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
