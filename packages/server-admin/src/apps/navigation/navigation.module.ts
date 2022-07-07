import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationService } from './navigation.service';
import { NavigationController } from './navigation.controller';
import { NavigationTcpController } from './navigation.tcp.controller';
import { NavigationEntity } from '@/entities/navigation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NavigationEntity])],
  controllers: [NavigationController, NavigationTcpController],
  providers: [NavigationService],
  exports: [NavigationService],
})
export class NavigationModule {}
