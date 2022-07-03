import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationService } from './navigation.service';
import { NavigationController } from './navigation.controller';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';

@Module({
  imports: [BaseMicroserviceModule],
  controllers: [NavigationController],
  providers: [NavigationService],
  exports: [NavigationService],
})
export class NavigationModule {}
