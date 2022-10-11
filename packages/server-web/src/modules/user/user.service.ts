import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { findUserItemQuery } from './dto/user.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    IPaginationOptions,
    BaseService,
} from '@/globals/services/base.service';

export class CreateUser extends PartialType(CreateUserDto) {}

@Injectable()
export class UserService extends BaseService<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
        super(userRepository);
    }

    update(id: number, createUser: CreateUser) {
        return this.userRepository.update(id, createUser);
    }

    findOneBy(where: FindOptionsWhere<UserEntity>) {
        return this.userRepository.findOneBy(where);
    }

    findList(options: IPaginationOptions<UserEntity>) {
        return this.findListAndPage(options);
    }
}
