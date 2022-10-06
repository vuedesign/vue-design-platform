import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationService } from './navigation.service';
import { NavigationController } from './navigation.controller';
import { NavigationEntity } from '@/entities/navigation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NavigationEntity])],
    controllers: [NavigationController],
    providers: [NavigationService],
    exports: [NavigationService],
})
export class NavigationModule {}
