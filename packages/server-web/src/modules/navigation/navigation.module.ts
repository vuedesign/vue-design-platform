import { Module } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { NavigationController } from './navigation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationEntity } from '@/entities/navigation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NavigationEntity])],
    controllers: [NavigationController],
    providers: [NavigationService],
    exports: [NavigationService],
})
export class NavigationModule {}
