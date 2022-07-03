import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '@/app.service';
import { Public } from '@/core/decorators/auth.decorator';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Public()
  // @Get('/app/:id')
  // getById(@Param('id') id: string): Observable<any> {
  //   console.log('=====x==x=x', id);
  //   return this.appService.findOneById(+id);
  // }
}
