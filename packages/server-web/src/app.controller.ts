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
  @Get('/item/:id')
  getById(@Param('id') id: string) {
    return this.appService.findOneById(+id);
  }
}
