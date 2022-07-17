import { Module } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { NavigationResolver } from './navigation.resolver';
import { NavigationController } from './navigation.controller';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';

@Module({
  imports: [BaseMicroserviceModule],
  controllers: [NavigationController],
  providers: [NavigationResolver, NavigationService],
  exports: [NavigationService],
})
export class NavigationModule {}
