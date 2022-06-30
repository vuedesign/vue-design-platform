import { Injectable, Inject } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class HomeService {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly client: ClientProxy,
  ) {}
  create(createHomeDto: CreateHomeDto) {
    return 'This action adds a new home';
  }

  findOneUserById(id: number) {
    // return this.client.send({ role: 'user', cmd: 'find-one-by-id' }, id);
    return '';
  }

  findAll() {
    return `This action returns all home`;
  }

  findOne(id: number) {
    return `This action returns a #${id} home`;
  }

  update(id: number, updateHomeDto: UpdateHomeDto) {
    return `This action updates a #${id} home`;
  }

  remove(id: number) {
    return `This action removes a #${id} home`;
  }
}
