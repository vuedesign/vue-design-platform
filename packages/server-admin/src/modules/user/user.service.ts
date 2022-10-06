import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { findUserItemQuery } from './dto/user.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    BaseService,
    IPaginationResponse,
    IPaginationOptions,
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

    create(createUser: CreateUser) {
        this.userRepository.create(createUser);
        return this.userRepository.save(createUser);
    }

    findList(
        options: IPaginationOptions<UserEntity>,
    ): Promise<IPaginationResponse> {
        return this.findListAndPage(options);
    }

    findOne(query: findUserItemQuery): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({
            where: query,
        });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.userRepository.update(id, updateUserDto);
    }

    remove(id: number) {
        return this.userRepository.delete(id);
    }

    count() {
        return this.userRepository.count();
    }
}
