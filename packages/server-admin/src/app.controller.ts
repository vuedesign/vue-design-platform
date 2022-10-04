import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { Public } from './core/decorators/auth.decorator';

@Controller('common')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
