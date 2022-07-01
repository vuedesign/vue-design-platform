import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from '@/configs/typeorm.config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import appsModule from '@/apps/imports';
import { JwtAuthGuard } from '@/apps/auth/guards/jwt-auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // TypeOrmModule.forRoot(typeormConfig),
    // TypeOrmModule.forFeature(appsModule),
    // ...appsModule,
    ClientsModule.register([
      { name: 'USER_MICROSERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
