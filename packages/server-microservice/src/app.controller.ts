import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ role: 'app', cmd: 'find-one-by-id' })
  findOneById(id: number) {
    console.log('findOneByIdfindOneByIdfindOneById======////', id);
    return `test${id}`;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
