import { Module } from '@nestjs/common';
import { ConfigureService } from './configure.service';
import { ConfigureEntity } from '@/entities/configure.entity';
import { ConfigureController } from './configure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ConfigureEntity])],
    controllers: [ConfigureController],
    providers: [ConfigureService],
})
export class ConfigureModule {}
