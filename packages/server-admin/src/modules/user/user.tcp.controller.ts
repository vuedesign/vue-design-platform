import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { IPaginationOptions } from '@/globals/services/base.service';
import { UserEntity } from '@/entities/user.entity';
import { findUserItemQuery } from './dto/user.dto';

/**
 * 用户模块
 */
@Controller()
export class UserTcpController {
    constructor(private readonly userService: UserService) {}
    /**
     * 用户列表
     */
    @MessagePattern({ module: 'user', method: 'findList' }, Transport.TCP)
    findList(options: IPaginationOptions<UserEntity>) {
        const query = Object.assign(options, {
            select: {
                id: true,
                uuid: true,
                username: true,
                nickname: true,
                avatar: true,
            },
        });
        return this.userService.findList(query);
    }

    @MessagePattern({ module: 'user', method: 'findOne' }, Transport.TCP)
    findOne(query: findUserItemQuery) {
        return this.userService.findOne(query);
    }
}
