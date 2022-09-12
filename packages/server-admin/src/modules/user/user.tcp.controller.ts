import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { IPaginationOptions } from '@/globals/services/base.service';
import { UserEntity } from '@/entities/user.entity';

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
        return this.userService.findList(options);
    }

    @MessagePattern({ module: 'user', method: 'findOne' }, Transport.TCP)
    findOne(id: number) {
        return this.userService.findOne({ id });
    }
}
