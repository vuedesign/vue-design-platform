import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import appsModule from '@/apps/imports';
import { JwtAuthGuard } from '@/apps/auth/guards/jwt-auth.guard';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';
// import { HomeModule } from './apps/home/home.module';
import { UserModule } from './apps/user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(typeormConfig),
    // TypeOrmModule.forFeature(appsModule),
    // ...appsModule,
    BaseMicroserviceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  // exports: [UserModule],
})
export class AppModule {}
