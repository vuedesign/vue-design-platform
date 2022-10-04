import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginParam } from './dto/auth.dto';
import { getFieldType } from '@/core/utils';
import { BaseMicroservice } from '@/globals/services/base.microservice';
import { UserEntity } from '@/entities/user.entity';
// import { decrypt } from '@/globals/services/rsa.service';

@Injectable()
export class AuthService extends BaseMicroservice {
    async validateUser(account: string): Promise<UserEntity | null> {
        let field: string = getFieldType(account);
        const where = {
            [field]: account,
        };
        const user = await this.send<UserEntity>(
            { module: 'user', method: 'find-one' },
            where,
        );
        if (!user) {
            return null;
        }
        return user;
    }

    checkPassword(oldPassword: string, newPassword: string) {
        if (oldPassword !== newPassword) {
            throw new UnauthorizedException('登录密码错误');
        }
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
