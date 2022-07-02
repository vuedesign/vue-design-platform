import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '@/app.service';
import { Public } from '@/core/decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/app/:id')
  getById(@Param('id') id: string) {
    console.log('=====x==x=x', id);
    return this.appService.findOneById(+id);
  }
}
