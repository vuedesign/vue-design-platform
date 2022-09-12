import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserTcpController } from './user.tcp.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController, UserTcpController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
