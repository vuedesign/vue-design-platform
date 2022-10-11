import { Module } from '@nestjs/common';
import { CountService } from './count.service';
import { CountController } from './count.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountEntity } from '@/entities/count.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CountEntity])],
    controllers: [CountController],
    providers: [CountService],
    exports: [CountService],
})
export class CountModule {}
