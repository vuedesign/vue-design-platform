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

    @MessagePattern({ module: 'auth', method: 'find-one' }, Transport.TCP)
    findOne(query: Record<string, any>) {
        return this.userService.findOne(query);
    }

    @MessagePattern({ module: 'auth', method: 'update' }, Transport.TCP)
    async update(data: Record<string, any>) {
        const { id, ...otherData } = data;
        const res = await this.userService.update(id, otherData);
        return !!res.affected;
    }

    @MessagePattern({ module: 'auth', method: 'register' }, Transport.TCP)
    register(body: LoginParam) {
        return this.authService.register(body);
    }
}
