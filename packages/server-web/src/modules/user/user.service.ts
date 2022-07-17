import { Injectable, Inject } from '@nestjs/common';
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
  IPaginationQuery,
} from '@/globals/services/base.service';
import { BaseMicroservice } from '@/globals/services/base.microservice';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export class CreateUser extends PartialType(CreateUserDto) {}

@Injectable()
export class UserService extends BaseMicroservice {
  // constructor(
  //   @Inject('BASE_MICROSERVICE') private readonly client?: ClientProxy,
  // ) {}
  create(createUser: CreateUser) {
    return this.send<UserEntity>(
      { module: 'user', method: 'create' },
      createUser,
    );
  }

  // findList(query: IPaginationQuery): Promise<IPaginationResponse> {
  //   return this.findListAndPage(query);
  // }

  findOne(query: findUserItemQuery) {
    // return lastValueFrom(
    //   this.client.send({ role: 'user', cmd: 'find-one' }, query),
    // );
    return this.send<UserEntity>({ module: 'user', method: 'find-one' }, query);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return this.userRepository.update(id, updateUserDto);
  // }

  // remove(id: number) {
  //   return this.userRepository.delete(id);
  // }

  count() {
    console.log('=============count');
    return this.send<number>({ module: 'user', method: 'count' }, 10);
  }
}
