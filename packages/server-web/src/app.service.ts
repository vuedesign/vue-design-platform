import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('BASE_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // findOneById(id: number): Observable {
  //   console.log('id===wujin=====', id);
  //   // { role: 'user', cmd: 'find-one' }
  //   return this.client.send<number>({ role: 'user', cmd: 'find-one' }, id);
  // }
}
