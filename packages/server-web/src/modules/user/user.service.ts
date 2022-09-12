import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { findUserItemQuery } from './dto/user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { BaseMicroservice } from '@/globals/services/base.microservice';
import { IPaginationOptions } from '@/globals/services/base.service';

export class CreateUser extends PartialType(CreateUserDto) {}

@Injectable()
export class UserService extends BaseMicroservice {
    create(createUser: CreateUser) {
        return this.send<UserEntity>(
            { module: 'user', method: 'create' },
            createUser,
        );
    }

    findOne(query: findUserItemQuery) {
        return this.send<UserEntity>(
            { module: 'user', method: 'findOne' },
            query,
        );
    }

    findList(options: IPaginationOptions) {
        return this.send<UserEntity>(
            { module: 'user', method: 'findList' },
            options,
        );
    }
}
