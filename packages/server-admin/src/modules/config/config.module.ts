import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigEntity } from '@/entities/config.entity';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ConfigEntity])],
    controllers: [ConfigController],
    providers: [ConfigService],
})
export class ConfigModule {}
