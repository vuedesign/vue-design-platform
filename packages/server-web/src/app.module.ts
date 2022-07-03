import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import appsModule from '@/apps/imports';
import { JwtAuthGuard } from '@/apps/auth/guards/jwt-auth.guard';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';

@Module({
  imports: [BaseMicroserviceModule, ...appsModule],
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
