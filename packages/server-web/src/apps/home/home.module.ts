import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { UserModule } from '../user/user.module';
import { SiteModule } from '../site/site.module';
import { NavigationModule } from '../navigation/navigation.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'USER_MICROSERVICE', transport: Transport.TCP },
    ]),
    UserModule,
    SiteModule,
    NavigationModule,
  ],
  controllers: [HomeController],
  providers: [HomeController],
  exports: [HomeController],
})
export class HomeModule {}
