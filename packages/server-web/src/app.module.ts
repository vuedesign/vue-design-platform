import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
// import appsModule from '@/apps/imports';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './modules/site/site.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { AuthModule } from './modules/auth/auth.module';
import microservicesConfig from '@/configs/microservices.config';
import globalConfig from '@/configs/global.config';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './modules/auth/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig, microservicesConfig],
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    // 微服务
    BaseMicroserviceModule,
    SiteModule,
    NavigationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
