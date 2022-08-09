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

  findOne(query: findUserItemQuery) {
    return this.send<UserEntity>({ module: 'user', method: 'find-one' }, query);
  }

  count() {
    console.log('=============count');
    return this.send<number>({ module: 'user', method: 'count' }, 10);
  }
}
