import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginParam } from './dto/auth.dto';
import { getFieldType } from '@/core/utils';
import { UserEntity } from '@/entities/user.entity';
// import { decrypt } from '@/globals/services/rsa.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}
    checkPassword(oldPassword: string, newPassword: string) {
        if (oldPassword !== newPassword) {
            throw new UnauthorizedException('登录密码错误');
        }
    }
    async validateUser(account: string): Promise<UserEntity | null> {
        let field: string = getFieldType(account);
        const where = {
            [field]: account,
        };
        console.log('where', where);
        const user = await this.userRepository.findOneBy(where);
        console.log('user', user);
        if (!user) {
            return null;
        }
        return user;
    }

    register(registerData: LoginParam) {
        const data = {
            phone: '',
            email: '',
            username: '',
            nickname: '',
            password: '',
            avatar: '',
            rule: 3, // 角色：1-超级管理员，2-管理员，3-普通用户
            isShow: 1, // 是否可用：1-可用，2-不可用
            ...registerData,
        };
        this.userRepository.create(data);
        return this.userRepository.save(data);
    }
}
