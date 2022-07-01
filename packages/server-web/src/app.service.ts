import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly client: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  findOneById(id: number) {
    console.log('id===', id);
    return this.client.send({ role: 'app', cmd: 'find-one-by-id' }, id);
  }
}
