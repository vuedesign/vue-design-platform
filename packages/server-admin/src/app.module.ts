import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from '@/configs/typeorm.config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import appsModule from '@/modules/imports';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CountModule } from './modules/count/count.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), ...appsModule, CountModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
